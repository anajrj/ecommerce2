import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import signup from './user/Signup';
import signin from './user/Signin'
import PrivateRoute from './auth/helper/PrivateRoutes' 
import AdminRoute from './auth/helper/AdminRoutes' 
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'  
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/manageCategories';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProducts';
import UpdateThisProduct from './admin/UpdateProduct';
import { UpdateProduct } from './admin/helper/adminapicall';
import Cart from './core/Cart';



const Routes= ()=>{
  return(
    <BrowserRouter>
    <Switch>
    <Route path='/' exact component={Home}></Route>
    <Route path='/signup' exact component={signup}></Route>
    <Route path='/signin' exact component={signin}></Route>
    <Route path='/cart' exact component={Cart}></Route>

    <PrivateRoute path='/user/dashboard' exact component={UserDashBoard}></PrivateRoute>
    <AdminRoute path='/admin/dashboard' exact component={AdminDashBoard}></AdminRoute>
    <AdminRoute path='/admin/create/category' exact component={AddCategory}></AdminRoute>
    <AdminRoute path='/admin/category' exact component={ManageCategories}></AdminRoute>
    <AdminRoute path='/admin/create/product' exact component={AddProduct}></AdminRoute>
    <AdminRoute path='/admin/products' exact component={ManageProduct}></AdminRoute>
    <AdminRoute path='/admin/product/update/:productId' exact component={UpdateThisProduct}></AdminRoute>
    
    





    </Switch>
    
    </BrowserRouter>
  )
}

export default Routes