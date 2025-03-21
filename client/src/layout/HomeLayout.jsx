import React from 'react'
import { Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logOut } from '../features/login.Slice';
import { useDispatch } from 'react-redux';
import { showPopup } from '../features/confirmation.Slice';
const HomeLayout = () => {
  const dispatch = useDispatch()

  const out = () => {
    dispatch(
      showPopup({
        message: "Are you sure you want to Logout?",
        onConfirm: () => {
          dispatch(logOut())
        },
      }))
  }


  return (
    <div className='HomeLayout relative '>
      <nav className="navbar flex justify-between items-center bg-gray-100 sticky top-0 right-0 left-0  ">
        <div className="logo">
          <h1 className="text-2xl font-bold font-logo">
            <span className="text-blue-600">F</span>
            <span className="text-blue-600">I</span>
            <span className="text-blue-600">R</span>
            <span className="text-orange-500">S</span> {/*orange */}
            <span className="text-blue-600">T</span>
          </h1>
        </div>

        <div className="flex items-center  gap-3 font-medium ">

          <FiLogOut size={30} className=' ' onClick={() => dispatch(out())} />
        </div>



      </nav>
      <div className="home-outlet ">
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
