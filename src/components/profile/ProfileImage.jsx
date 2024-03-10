import { useRef, useState } from "react";

// icons/images.
import EditIcon from "../../assets/icons/edit.svg";

// custom hooks.
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

// utility functions.
import { getAvatar } from "../../utils/urls";

const ProfileImage = () => {
  const { user: auth } = useAuth();
  const { user, updateProfile } = useProfile();

  const fileRef = useRef(null);
  const [showAvatar, setShowAvatar] = useState(true);

  const isMe = auth?.id === user?.id;

  const handleImageUpdate = () => {
    const formData = new FormData();

    for (const file of fileRef.current.files) {
      formData.append("avatar", file);
    }

    // 'true' denotes that updating the avatar.
    updateProfile(formData, true);
  };

  const handleImageEdit = () => {
    if (fileRef.current) fileRef.current.click();
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="grid w-full h-full overflow-hidden text-5xl text-white bg-orange-600 rounded-full place-items-center">
        {showAvatar && user?.avatar ? (
          <img
            alt="Avatar"
            className="rounded-full"
            src={getAvatar(user?.avatar)}
            onError={() => setShowAvatar(false)}
          />
        ) : (
          <span>{user?.firstName[0]}</span>
        )}
      </div>

      {isMe && (
        <button
          onClick={handleImageEdit}
          className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80"
        >
          <img src={EditIcon} alt="Edit" />
          <input
            hidden
            type="file"
            ref={fileRef}
            accept=".png, .jpg, .jpeg"
            onChange={handleImageUpdate}
          />
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
