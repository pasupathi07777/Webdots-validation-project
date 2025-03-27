
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProduct, productsStates } from '../features/product.Slice';
import { getUsers, usersState } from '../features/user.Slice';
import { useDispatch } from 'react-redux';


const Home = () => {
   const dispatch = useDispatch()
  const navigation = useNavigate();
  const {  products } = useSelector(productsStates);
  const {  allUsers } = useSelector(usersState);
  console.log(allUsers);
  
  const dash = [
    { name: 'All Users', path: 'users',count:allUsers.length   },
    { name: 'Products', path: 'items',count: products.length },
  ];

  useEffect(()=>{
    dispatch(getUsers());
    dispatch(getProduct());
  })

  return (
    <div className="home-dash  h-full flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold  mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dash.map((data, index) => (
          <div
            key={index}
            onClick={() => navigation(data.path)}
            className="dad-nav min-h-[80px] bg-gray-100 flex flex-col justify-center items-center  p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer text-center"
          >
            <h1 className="text-xl font-semibold mb-2">{data.name}</h1>
            <p className="text-gray-600">Count: {data.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;