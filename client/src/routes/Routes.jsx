// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import AuthLayout from '../layout/AuthLayout'
// import Login from '../pages/Login'
// import Signup from '../pages/Signup'
// import HomeLayout from '../layout/HomeLayout'
// import FirstPage from '../pages/FirstPage'
// import { useSelector } from 'react-redux'
// import { loginState } from '../features/login.Slice'
// import Home from '../pages/Home'
// import Users from '../pages/Users'
// import Items from '../pages/Products'

// const Routess = ({verifyUserLoading}) => {
//     const { user,loginStatus } = useSelector(loginState)
//     return (
//         <>

//             <Routes>
               
//                 {
//                     !user ?
//                         <Route path='/' element={ verifyUserLoading ? <FirstPage/> :<AuthLayout />}>
//                             <Route path='*' element={<Navigate to='/' />} />
//                             <Route index element={<Login />} />
//                             <Route path='signup' element={ <Signup />} />
//                         </Route>
//                         :
//                         <Route path='/' element={ verifyUserLoading ? <FirstPage/> : <HomeLayout />}>
//                             {/* <Route path='*' element={<Navigate to='/' />} /> */}
//                             <Route index element={<Home />} />
//                             <Route path='users' element={<Users />} />
//                             <Route path='items' element={<Items />} />
                            
//                         </Route>


//                 }

// <Route path='*' element={<Navigate to='/' />} />




//             </Routes>

//         </>
//     )
// }

// export default Routess

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import HomeLayout from '../layout/HomeLayout'
import FirstPage from '../pages/FirstPage'
import { useSelector } from 'react-redux'
import { loginState } from '../features/login.Slice'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Items from '../pages/Products'

const Routess = ({verifyUserLoading}) => {
    const { user,loginStatus } = useSelector(loginState)
    if(verifyUserLoading){
        return <FirstPage/> 
    }
    return (
        <>

            <Routes>
               
                {
                    !loginStatus ?
                        <Route path='/' element={  <AuthLayout />}>
                        
                            <Route index element={<Login />} />
                            <Route path='signup' element={ <Signup />} />
                        </Route>
                        :
                        <Route path='/' element={ <HomeLayout />}>
                           
                            <Route index element={<Home />} />
                            <Route path='users' element={<Users />} />
                            <Route path='items' element={<Items />} />
                            
                        </Route>


                }

                {
                      <Route path='*' element={<Navigate to='/' />} />
                }






            </Routes>

        </>
    )
}

export default Routess

