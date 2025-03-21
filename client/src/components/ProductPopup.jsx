import React from 'react';
import InputFeilds from './InputFeilds';
import ButtonFeilds from './ButtonFeilds';

const ProductPopup = ({ isOpen, onClose, onSubmit, newProduct, handleInputChange, loading,handleImageUpload,isEditMode}) => {

  if (!isOpen) return null; 

  return (
    <div className="popup-form bg-opacity-50 fixed inset-0 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Product":"Add New Product"}</h2>

        <form onSubmit={onSubmit} className="flex flex-col ">

          <InputFeilds
          name={"name"}
            lable=" Name"
            type="text"
            placeholder="Enter product name"
            value={newProduct.name}
            setOnChange={handleInputChange}
            loading={loading}
            className={"border-2 rounded"}
        
          />
 
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-500" htmlFor="description">
               Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full border-0 border-2 rounded border-gray-200 focus:outline-none"
              rows="4"
            />
          </div>

          <InputFeilds
            lable="Image"
            type="file"
            placeholder="Enter image URL"
            value={newProduct.image}
            setOnChange={handleImageUpload}
            loading={loading}
            accept="image/*" 
            className={"border-2 rounded"}
          />

 
          <div className="flex justify-end gap-2">


            <ButtonFeilds type='buttom'  onClick={onClose}
              className="bg-gray-500 text-whiterounded-lg hover:bg-gray-600 h-8 transition-colors rounded" 
              label={"Cancel"} disabled={loading} />

            <ButtonFeilds             type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 h-8 transition-colors"
              label={isEditMode?"Updata":"Add"} loading={loading}/>
              
              
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPopup;