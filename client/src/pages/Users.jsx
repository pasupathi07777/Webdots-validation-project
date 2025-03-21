import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, usersState } from '../features/user.Slice';
import { SyncLoader } from 'react-spinners';
import ButtonFeilds from '../components/ButtonFeilds';
import { loginState } from '../features/login.Slice';
import { showPopup } from '../features/confirmation.Slice';

const Users = () => {
  const dispatch = useDispatch();
  const { usersLoading, allUsers, allDeleteUserIds } = useSelector(usersState);
  const { user} = useSelector(loginState);

  
  


  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  const onDelete = (id) => {
  
    dispatch(
      showPopup({
        message: "Are you sure you want to delete this User?",
        onConfirm: () => {
          dispatch(deleteUser(id));
        },
      }))
  };

  return (
    <div className="min-h-[300px] p-4 overflow-x-hidden flex flex-col gap-2 ">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {usersLoading ? (
        <div className="flex justify-center items-center h-64">
          <SyncLoader size={10} color="#3B82F6" />
        </div>
      ) : allUsers.length === 0 ? ( 
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">No users found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allUsers.map((data) => (
            <div
              key={data._id}
              className="model bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col gap-1 justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{data.userName }</h2>
                <p className="text-gray-600 mt-2">{data.number? "Number:":"Email:"} {data.number || data.email}</p>
              </div>

              <div className="flex justify-end">
                <ButtonFeilds
                  label={ user._id===data._id?"You":"Delete"}
                  loading={allDeleteUserIds.includes(data._id)}
                  className={`delete-btn w-fit rounded-full  ${user._id===data._id?"bg-green-600":"bg-red-500"}`}
                  onClick={user._id === data._id ? undefined : () => onDelete(data._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;