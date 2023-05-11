import Modal from "@/components/Common/Modal/Modal";
import React, { useState } from "react";
import classes from "./communites.module.css";
import { GrAdd } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { HiLockClosed } from "react-icons/hi";

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
  const [communityValues, setCommunityValues] = useState({
    communityName: "",
    communityType: "public",
  });
  const [charLimit, setCharLimit] = useState(21);

  const handleChange = (eve: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = eve.target;
    if (value.length > 21) return;
    setCommunityValues((prev) => ({ ...prev, [name]: value }));
    setCharLimit(21 - value.length);
  };

  const handleRadio = (eve: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = eve.target;
    console.log(value);
    setCommunityValues((prev) => ({ ...prev, [name]: value }));
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
                community names including capitalisation cannot be change
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
              className={`sm-txt ${charLimit === 0 ? "err-txt" : ""}`}
            >
              {charLimit} characters are left
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
                />
                <p>
                  <span>{item.icon}</span>
                  <b>{item.title}</b>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </>
      </Modal>
    </>
  );
};

export default Communities;
