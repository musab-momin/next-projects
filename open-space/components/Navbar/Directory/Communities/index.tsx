import Modal from "@/components/Common/Modal/Modal";
import React, { useState } from "react";
import classes from "./communites.module.css";
import { GrAdd } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { HiLockClosed } from "react-icons/hi";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore, auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGlobalAppApiContext } from "@/contexts/GlobalAppContext";

const COMMUNITY_TYPES = [
  {
    icon: <FaUser size={14} color="#898989" />,
    title: "public",
    desc: "Anyone can view, post, and comment to this community.",
  },
  {
    icon: <VscEye size={14} color="#898989" />,
    title: "restricted",
    desc: "Anyone can view this community, but only approved users can post.",
  },
  {
    icon: <HiLockClosed size={14} color="#898989" />,
    title: "private",
    desc: "Only approved users can view and submit to this community.",
  },
];

const Communities = () => {
  const [open, setOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [communityValues, setCommunityValues] = useState({
    communityName: "",
    communityType: "public",
  });
  const [charLimit, setCharLimit] = useState(21);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const { successToaster } = useGlobalAppApiContext();

  const handleChange = (eve: React.ChangeEvent<HTMLInputElement>) => {
    if (validationError) setValidationError("");
    const { name, value } = eve.target;
    if (value.length > 21) return;
    setCommunityValues((prev) => ({ ...prev, [name]: value }));
    setCharLimit(21 - value.length);
  };

  const handleRadio = (eve: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = eve.target;
    setCommunityValues((prev) => ({ ...prev, [name]: value }));
  };

  const createCommunity = async () => {
    const validationReg = /[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (validationReg.test(communityValues.communityName)) {
      setValidationError("Not a valid community name");
      return;
    }
    try {
      setLoading(true);
      //create reference of single entry in table you want to update

      const communityDocRef = doc(
        firestore,
        "communities",
        communityValues.communityName
      );

      await runTransaction(firestore, async (transaction) => {
        //check is the entry exist if yes update it else create it
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `This community name ${communityValues.communityName} is already taken, try another.`
          );
        }
        //create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityValues.communityType,
        });

        //adding created community to exsiting user
        transaction.set(
          doc(
            firestore,
            `/users/${user?.uid}/community-details`,
            communityValues.communityName
          ),
          {
            id: communityValues.communityName,
            isModerator: true,
          }
        );
        setLoading(false);
        if (validationError) setValidationError("");
        successToaster("Community created Successfully!!");
      });
    } catch (err: any) {
      console.error(err);
      setValidationError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="normalise-btn always-flex"
        onClick={() => setOpen(true)}
      >
        <span>
          <GrAdd />
        </span>
        <span className="para2 ml">Create Community</span>
      </button>
      <Modal
        title="Create community"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <>
          <div>
            <div className="mb">
              <h3>Name</h3>
              <small>
                community names including capitalizations cannot be change
              </small>
            </div>
            <input
              required
              type="text"
              className="inp"
              name="communityName"
              value={communityValues.communityName}
              onChange={handleChange}
              id="community-name"
            />
            <label
              htmlFor="community-name"
              className={`sm-txt ${
                charLimit === 0 || validationError ? "err-txt" : ""
              }`}
            >
              {validationError
                ? validationError
                : `${charLimit} characters are left`}
            </label>
          </div>
          <div className="mt">
            <h3>Community type</h3>
            {COMMUNITY_TYPES?.map((item, indx) => (
              <div className={classes.inpGrp} key={indx}>
                <input
                  required
                  type="radio"
                  name="communityType"
                  onChange={handleRadio}
                  checked={communityValues.communityType === item.title}
                  value={item.title}
                  id={`community-${item.title}`}
                />
                <label htmlFor={`community-${item.title}`}>
                  <span>{item.icon}</span>
                  <b>{item.title}</b>
                  {item.desc}
                </label>
              </div>
            ))}
          </div>
          <div className="mt">
            <button
              type="button"
              className={`frm-btn primary-btn ${loading ? "btn-loading" : ""}`}
              onClick={createCommunity}
            >
              Create Community
            </button>
          </div>
        </>
      </Modal>
    </>
  );
};

export default Communities;
