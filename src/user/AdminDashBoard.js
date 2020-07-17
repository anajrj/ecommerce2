import React from 'react'
import Base from '../core/Base' 
import {isAuthenticated} from '../auth/helper/index'
import { Link } from 'react-router-dom'

const AdminDashBoard = ()=>{

    const {user: {name, email, role}} = isAuthenticated()

    const AdminLeftSide = ()=>{
        return (
            <div className='card'>
            <h4 className='card-header bg-info text-white'> Admin Navigation</h4>
            
            <ul className='list-group'>
            <li className='list-group-item'>
            <Link className='nav-link text-black-50' to='/admin/create/category'>Create Categories</Link>
            </li>
            <li className='list-group-item'>
            <Link className='nav-link text-black-50' to='/admin/category'>Manage Categories</Link>
            </li>

            <li className='list-group-item'>
            <Link className='nav-link text-black-50' to='/admin/create/product'>Create Products</Link>
            </li>
            <li className='list-group-item'>
            <Link className='nav-link text-black-50' to='/admin/products'>Manage Products</Link>
            </li>
            <li className='list-group-item'>
            <Link className='nav-link text-black-50' to='/admin/orders'>Manage Orders</Link>
            </li>
            </ul>
            </div>

        )
    }


    const AdminRightSide= ()=>{
        return(
            <div className='card mb-4'>
            <h4 className='card-header bg-success text-white'> Admin Information</h4>
            
            <ul className='list-group'>
            <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Name:</span> {name}
            </li>
            <li className='list-group-item'>
            <span className='badge badge-success mr-2'>Email:</span> {email}
            </li>

            <li className='list-group-item'>
            <Link  className='nav-link  mt-5 text-center'>Change Admin Info </Link>
            </li>

            </ul>
            </div>
        )
    }



    return (
        <Base title=' Welcome to Admin Dashboard' description="Admin can manage products and orders from here"  className='container bg-dark p-4'>

        <div className='row'>
        <div className='col-3'>
        {AdminLeftSide()}
        </div>
        <div className='col-9'>
        {AdminRightSide()} 
        </div>
        </div>


        

        </Base>
    )
}


export default AdminDashBoard