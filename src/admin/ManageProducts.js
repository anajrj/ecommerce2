import React, {useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getAllProducts, DeleteProduct } from './helper/adminapicall'




const ManageProduct= ()=>{

    const [products,setProducts]= useState([])

    const {user, token}= isAuthenticated()

    const preload= ()=>{
        getAllProducts()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else if(data.err){
                console.log(data.err)
            }
            else{
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        preload()
    }, [])

    const DeleteThisProduct= (productId )=>{
        DeleteProduct(productId, user._id, token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else if(data.err){
                console.log(data.err)
            }
            else{
                preload()
            }
        })
    }


    return(
        <Base title="Welcome admin" description="Manage products here"  className='text-left text-white p-4 '>
      
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="text-left">Admin Home</span>
      </Link>
      <h2 className="mb-4 text-center">All products:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white  mb-4">Total {products.length} products</h2>

          {products.map((product, index)=>(
            <div  key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left"> {product.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                  DeleteThisProduct(product._id)
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          ))}

        </div>
      </div>
    </Base>
    )
}

export default ManageProduct