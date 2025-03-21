import React, { useEffect } from 'react'
import Routes from './routes/Routes'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { authUser, loginState } from './features/login.Slice';
import ConfirmationPopup from './components/ConfirmationPopup';
import { getUsers } from './features/user.Slice';
import { getProduct } from './features/product.Slice';

const App = () => {
  const dispatch = useDispatch()
  const { verifyUserLoading } = useSelector(loginState)
  useEffect(() => {
    dispatch(authUser())
    .unwrap()
    .then(() => {

      dispatch(getUsers());
       dispatch(getProduct());
    });


  }, [])
  return (
    <div className=' w-screen h-screen overflow-x-hidden  '>
      <ConfirmationPopup />
      <Routes verifyUserLoading={verifyUserLoading} />
      <Toaster />

    </div>
  )
}

export default App
