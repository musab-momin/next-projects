import React, { useRef } from "react";
import classes from "./submit.module.css";
import Image from "next/image";

type ImageUploadProps = {
  onImageSelect: (eve: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage?: string;
  unSelectImage: () => void;
  handleSubmitPost: () => void;
  loading: boolean;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
  unSelectImage,
  handleSubmitPost,
  loading,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classes.imgContainer}>
      {selectedImage ? (
        <div className={classes.contentContainer}>
          <div className={classes.imgWrapper}>
            <Image src={selectedImage} alt="#" fill />
          </div>
          <div className="flex">
            <button
              type="button"
              className="normalise-btn primary-outline-btn"
              onClick={unSelectImage}
            >
              back
            </button>
            <button
              type="button"
              className={`normalise-btn primary-btn ml ${
                loading ? "btn-loading-circle" : ""
              }`}
              onClick={handleSubmitPost}
            >
              upload
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="normalise-btn primary-outline-btn"
            onClick={() => inputFileRef.current?.click()}
          >
            Upload
          </button>
          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={onImageSelect}
          />
        </>
      )}
    </div>
  );
};

export default ImageUpload;
