import toast from "react-hot-toast";
import validator from 'validator';

export const validateForm = (data, type) => {
  const { userName, emailOrNumber, password } = data;


  if (!emailOrNumber) {
    toast.error('Email/Phone fields are required.');
    return false;
  }
  if (!password) {
    toast.error(' Password fields are required.');
    return false;
  }


  if (type !== "login") {
    if (!userName) {
      toast.error('Username is required.');
      return false;
    }
    if (userName.length < 5) {
      toast.error('Username must be at least 5 characters long.');
      return false;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return false;
    }
  }


  if (emailOrNumber.includes('@')) {

    if (!validator.isEmail(emailOrNumber)) {
      toast.error('Please enter a valid email address.');
      return false;
  } 
  } else {

    const hasLetters = /[a-zA-Z]/.test(emailOrNumber);
    const hasNumbers = /\d/.test(emailOrNumber);

    if (hasLetters && hasNumbers) {

      toast.error('Please enter a valid email or phone number.');
      return false;
    } else if (hasLetters) {

      toast.error('Please enter a valid email address.');
      return false;
    } else {

      const phoneRegex = /^\d{10}$/; 
      if (!phoneRegex.test(emailOrNumber)) {
        toast.error('Please enter a valid 10-digit phone number.');
        return false;
      }
    }
  }




  return true;
};