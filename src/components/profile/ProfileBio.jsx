import { flushSync } from "react-dom";
import { Fragment, useRef, useState } from "react";

// icons/images.
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import CrossIcon from "../../assets/icons/cross.svg";

// custom hooks.
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

const ProfileBio = () => {
  const { user: auth } = useAuth();
  const { user, updateProfile } = useProfile();

  const textareaRef = useRef(null);
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);

  const isMe = auth?.id === user?.id;

  const handleBioUpdate = () => {
    setEditMode(false);
    updateProfile({ bio });
    setBio("");
  };

  const handleBioEdit = () => {
    flushSync(() => setEditMode(true));
    textareaRef.current?.focus();
    setBio(user?.bio);
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setBio("");
  };

  return (
    <div className="flex items-start gap-2 mt-4 lg:mt-6">
      <div className="flex-1">
        {editMode ? (
          <textarea
            rows={4}
            cols={55}
            value={bio}
            ref={textareaRef}
            onChange={(e) => setBio(e.target.value)}
            className='p-2 className="leading-[188%]  bg-slate-700 lg:text-lg rounded-md'
          />
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{user?.bio}</p>
        )}
      </div>

      {isMe && (
        <Fragment>
          {editMode ? (
            <span className="flex flex-col gap-4">
              <button
                onClick={handleBioUpdate}
                className="grid rounded-full flex-center h-7 w-7 place-items-center bg-slate-700 hover:bg-slate-700/80"
              >
                <img src={CheckIcon} alt="Check" />
              </button>

              <button
                onClick={handleEditCancel}
                className="grid rounded-full flex-center h-7 w-7 place-items-center bg-slate-700 hover:bg-slate-700/80"
              >
                <img src={CrossIcon} alt="Close" />
              </button>
            </span>
          ) : (
            <button
              onClick={handleBioEdit}
              className="grid rounded-full flex-center h-7 w-7 place-items-center bg-slate-700 hover:bg-slate-700/80"
            >
              <img src={EditIcon} alt="Edit" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProfileBio;
