import React, { useState } from 'react';
import authImg from '../assets/auth-photo.png';
import InputFeilds from '../components/InputFeilds';
import ButtonFeilds from '../components/ButtonFeilds';
import { useDispatch, useSelector } from 'react-redux';
import { validateForm } from '../utils/validation';
import { useNavigate } from 'react-router-dom'
import { loginState, loginUser } from '../features/login.Slice';

const Login = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const { loginLoading } = useSelector(loginState)
  const [formData, setFormData] = useState({
    emailOrNumber: '',
    password: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formData, "login")) {

      const isEmail = formData.emailOrNumber.includes('@');

      const payload = {
        password: formData.password,
        [isEmail ? 'email' : 'number']: formData.emailOrNumber,
      };

      dispatch(loginUser(payload))
        .unwrap()
        .then(() => {
          navigation("/");
        })

    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen overflow-hidden">
      <div className="bg-white w-full md:w-[40%] p-8 flex justify-center flex-col items-center gap-5 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-[70%] flex flex-col gap-5">

          <InputFeilds
            name={"emailOrNumber"}
            lable="Email or Phone Number"
            type="text"
            placeholder="Enter your email or phone number"
            value={formData.emailOrNumber}
            setOnChange={handleChange}
            loading={loginLoading}
          />

          <InputFeilds
            name={"password"}
            lable="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            setOnChange={handleChange}
            loading={loginLoading}
          />

          <ButtonFeilds loading={loginLoading} label={"Login"} className='rounded-full h-10 bg-yellow-400 hover:bg-yellow-500  text-black' />

          <p
            className='text-black font-semibold  text-[14px] text-center text-purple-500 cursor-pointer ' // Using Tailwind's built-in purple-500
            onClick={() => navigation('signup')}
          >
            Signup
          </p>
        </form>
      </div>

      <div className="hidden md:block w-[60%] h-screen overflow-hidden">
        <img
          src={authImg}
          alt="Authentication"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
