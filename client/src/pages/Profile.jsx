import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { updateCurrentUser } from "firebase/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("in submit");
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(currentUser);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  // console.log(formData);
  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(progress);

        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setFormData({ ...formData, imageUrl: downloadURL });
        });
      }
    );
  };

  // Delete user Handler
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === "false") {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        {/* Take input of the image  */}
        <input
          type="file"
          ref={fileRef}
          className=" hidden"
          accept="image/.*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={formData.imageUrl || currentUser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center rounded-full object-cover cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-600">
              Error Uploading Image (File size must be below 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading : ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : (
            " "
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="UserName"
          defaultValue={currentUser.username}
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-600 p-3 rounded-lg text-white capitalize hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer ">Sign Out</span>
      </div>

      <p className="text-red-600 text-center p-5">
        {error && "Something Went Wrong!"}
      </p>
      <p className="text-green-600 text-center p-5">
        {updateSuccess && "User Updated Successfully!"}
      </p>
    </div>
  );
};

export default Profile;
