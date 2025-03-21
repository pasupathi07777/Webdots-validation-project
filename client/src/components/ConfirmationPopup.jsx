
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmationSliceStates, hidePopup } from "../features/confirmation.Slice"; 
import ButtonFeilds from "./ButtonFeilds";

const ConfirmationPopup = () => {
  const dispatch = useDispatch();
  const { isVisible, message, onConfirm } = useSelector(confirmationSliceStates);

  if (!isVisible) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); 
    }
    dispatch(hidePopup()); 
  };

  const handleCancel = () => {
    dispatch(hidePopup()); 
  };

  return (
    <div className="fixed inset-0 popup-form flex justify-center items-center  z-50">
      <div className="bg-white p-6  shadow-lg w-96 rounded">
        <h6 className=" mb-4">{message}</h6>
        <div className="flex justify-end gap-2 ">
          <ButtonFeilds
            onClick={handleCancel}
            label={"Cancel"}
            className="bg-gray-400 text-white h-8 rounded hover:bg-gray-500"/>

          <ButtonFeilds
            onClick={handleConfirm}
            label={"Confirm"}
            className="bg-red-500 text-white h-8 rounded  hover:bg-red-600"/>
            
         
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
