import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, postProduct, updataProduct, deleteaProduct, productsStates } from '../features/product.Slice';
import { SyncLoader } from 'react-spinners';
import ProductPopup from '../components/ProductPopup';
import toast from 'react-hot-toast';
import ButtonFeilds from '../components/ButtonFeilds';
import { showPopup } from '../features/confirmation.Slice';

const Products = () => {
  const dispatch = useDispatch();
  const { getProductLoading, postProductLoading, updateProductLoading, deleteProductLoading, updataProductIds, deleteProductIds, products } = useSelector(productsStates);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: '',
    name: '',
    image: '',
    description: '',
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    setCurrentProduct({ ...currentProduct, [name]: value });
    console.log(currentProduct);

  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        let finalFile = file;

        if (file.size > 10485760) {
          const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          };
          finalFile = await imageCompression(file, options);
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          handleInputChange({ target: { name: 'image', value: reader.result } });
        };
        reader.readAsDataURL(finalFile);
      } catch (error) {
        alert('Image compression failed.');
        console.error('Error during compression:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, image, description } = currentProduct;
    if (!name || !image || !description) {
      toast.error('Fill All Fields');
      return;
    }

    if (isEditMode) {

      setIsPopupOpen(false);
      dispatch(updataProduct(currentProduct))
        .unwrap()
        .then(() => {

          setCurrentProduct({ _id: '', name: '', image: '', description: '' });
          setIsEditMode(false);
        });
    } else {

      dispatch(postProduct(currentProduct))
        .unwrap()
        .then(() => {
          setIsPopupOpen(false);
          setCurrentProduct({ _id: '', name: '', image: '', description: '' });
        });
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditMode(true);
    setIsPopupOpen(true);
  };

  const handleDelete = (productId) => {

    dispatch(
      showPopup({
        message: "Are you sure you want to delete this ?",
        onConfirm: () => {
          dispatch(deleteaProduct(productId))

        },
      })
    );
  };

  return (
    <div className="min-h-[300px] p-4 overflow-x-hidden flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <ButtonFeilds
          label={" Add Product"}
          onClick={() => {
            setIsPopupOpen(true);
            setIsEditMode(false);
            setCurrentProduct({ _id: '', name: '', image: '', description: '' });
          }}
          className="bg-blue-500 text-white  rounded hover:bg-blue-600 transition-colors h-8 flex "
        />


      </div>

      {getProductLoading ? (
        <div className="flex justify-center items-center h-64">
          <SyncLoader size={10} color="#3B82F6" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">No products found.</p>
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="product bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center gap-2 "
            >
              <div className="flex flex-col items-center">
                {product?.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" h-40 w-40  object-contain rounded-lg"
                  />
                )}
                <h2 className="text-lg font-semibold capitalize">{product.name}</h2>
                <p className="text-gray-600 capitalize">{product.description}</p>
              </div>
              <div className="flex justify-end gap-2 w-full">



                <ButtonFeilds
                  label={"Edit"}
                  onClick={() => handleEdit(product)}
                  loading={updataProductIds.includes(product._id)}
                  className="bg-yellow-500 text-white  rounded hover:bg-yellow-600 transition-colors h-8 " />
                <ButtonFeilds
                  label={"Delete"}
                  loading={deleteProductIds.includes(product._id)}
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white  rounded hover:bg-red-600 transition-colors h-8" />

              </div>
            </div>
          ))}
        </div>
      )}

      <ProductPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
        newProduct={currentProduct}
        handleInputChange={handleInputChange}
        handleImageUpload={handleImageUpload}
        loading={isEditMode ? updateProductLoading : postProductLoading}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Products;