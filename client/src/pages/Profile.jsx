import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5 ">
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center rounded-full object-cover cursor-pointer"
        />
        <input
          type="text"
          placeholder="UserName"
          defaultValue={currentUser.username}
          className="bg-slate-100 p-3 rounded-lg "
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="bg-slate-100 p-3 rounded-lg "
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg "
        />
        <button
          type="button"
          className="bg-slate-600 p-3 rounded-lg text-white capitalize hover:opacity-90 disabled:opacity-80"
        >
          Update Profile
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
