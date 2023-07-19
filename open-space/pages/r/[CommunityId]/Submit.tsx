import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoImageOutline } from "react-icons/io5";
import classes from "./community.module.css";
import PageLayout from "@/components/Layouts/PageLayout";
import Tabs from "@/components/Submit/Tabs";
import TextInputs from "@/components/Submit/TextInputs";
import ImageUpload from "@/components/Submit/ImageUpload";
import { PostType } from "@/contexts/PostContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formTabs = [
  {
    title: "Post",
    icon: <HiOutlineDocumentText />,
  },
  {
    title: "Image & Video",
    icon: <IoImageOutline />,
  },
  {
    title: "Link",
    icon: <BsLink45Deg />,
  },
  {
    title: "Poll",
    icon: <BiPoll />,
  },
  {
    title: "Talk",
    icon: <BsMic />,
  },
];

const Submit = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { CommunityId } = router.query;

  const [activeTab, setActiveTab] = useState("Post");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const onImageSelect = (eve: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (eve.target.files?.[0]) {
      reader.readAsDataURL(eve.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const unSelectImage = () => {
    setSelectedFile("");
  };

  const handleChange = (
    eve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = eve.target;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPost = async () => {
    const postObj = {
      creatorId: user!.uid,
      communityName: CommunityId as string,
      creatorName: user!.email!.split("@")[0],
      createdAt: serverTimestamp() as Timestamp,
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      upVotes: 0,
    };
    setLoading(true);
    try {
      //store the post db
      const postDocRef = await addDoc(collection(firestore, "posts"), postObj);

      //check for selected file
      if (selectedFile) {
        //store file in storage getDownloadURL gets file url
        const imageRef = ref(storage, `posts/${postDocRef?.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        //update postDocRef
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
    } catch (error: any) {
      console.log(error?.message);
    }
    setLoading(false);
    router.back();
  };

  return (
    <PageLayout>
      <div>
        <div className="container">
          <div className={classes.header}>
            <p className={classes.header__title}>Create Post</p>
            <div className={classes.outline}></div>
          </div>
          <div className={classes.container}>
            <div className={classes.tabs}>
              {formTabs.map((tab, indx) => (
                <Tabs
                  key={indx}
                  title={tab.title}
                  icon={tab.icon}
                  activeTab={activeTab}
                  changeActiveTab={(tabTitle: string) => setActiveTab(tabTitle)}
                />
              ))}
            </div>
            <div className={classes.titlebar}>
              <input
                type="text"
                placeholder="Title"
                name="title"
                className={classes.titlebar__inp}
                value={textInputs.title}
                onChange={handleChange}
              />
            </div>
            {activeTab === "Post" && (
              <>
                <div className={classes.titlebar}>
                  <TextInputs
                    inputValue={textInputs.body}
                    handleChange={handleChange}
                  />
                </div>
              </>
            )}
            {activeTab === "Image & Video" && (
              <ImageUpload
                onImageSelect={onImageSelect}
                selectedImage={selectedFile}
                unSelectImage={unSelectImage}
                handleSubmitPost={handleSubmitPost}
                loading={loading}
              />
            )}
            {activeTab !== "Image & Video" && (
              <>
                <div className={classes.outlineGrey}></div>
                <div className={classes.footer}>
                  <button
                    type="button"
                    className={`normalise-btn primary-btn ${
                      loading ? "btn-loading-circle" : ""
                    }`}
                    onClick={handleSubmitPost}
                  >
                    Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </PageLayout>
  );
};

export default Submit;
