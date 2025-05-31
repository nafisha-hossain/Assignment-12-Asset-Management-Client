import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../components/Title/Title';
import useAuth from '../../hooks/useAuth';
export const Profile = () => {
  const { user, updateUserProfile, loading } = useAuth();

  const [isNameEdit, setIsNameEdit] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    await updateUserProfile(name, user?.photoURL);
    setIsNameEdit(false);
  };

  if (loading) return <LoadingSpinner h={'80vh'} />;
  return (
    <div className="mb-24 flex items-center justify-center pt-40">
      <Title title={'AssetAura | Profile'} />
      <form
        onSubmit={handleProfileUpdate}
        className="mx-auto flex w-full max-w-2xl flex-col justify-center rounded py-10 shadow-profile-card dark:bg-gray-800 sm:px-12"
      >
        <img
          src={user?.photoURL}
          alt=""
          className="mx-auto aspect-square h-32 w-32 rounded-full object-cover dark:bg-gray-500"
        />
        <div className="mb-3 mt-4 space-y-1">
          <div className="mb-2 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 sm:text-3xl">
            {isNameEdit ? (
              <input
                defaultValue={user?.displayName}
                type="text"
                id="name"
                name="name"
                className="mb-2 block w-full max-w-[230px] rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                placeholder="Enter your full name"
              />
            ) : (
              <>
                {user?.displayName}
                <button onClick={() => setIsNameEdit(true)}>
                  <CiEdit className="text-2xl" />
                </button>
              </>
            )}
          </div>
          <p className="flex items-center justify-center text-center dark:text-gray-300 sm:text-lg">
            <AiOutlineMail className="mr-2 text-xl" />
            {user?.email}
          </p>
        </div>
        <button
          type="submit"
          className="mx-auto mt-4 w-40 rounded bg-blue-700 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
};
