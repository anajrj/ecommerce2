import React, {useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { CreateCategory } from './helper/adminapicall'


const AddCategory = ()=>{

    const [category, setCategory]= useState({
        name: '',
        product_type: ''

    })

    const {name, product_type}= category
    // const [productType, setproductType]= useState('')
    const [error, setError]= useState(false)
    const [success, setSuccess]= useState(false)

    const {user, token}= isAuthenticated()

    const goBack= ()=>(
        <div className='mt-5'>
        <Link className='btn btn-sm btn-success mb-3' to='/admin/dashboard'>Admin Home</Link>
        </div>
    )

    const handleChange= name=>event=>{
        setError('')
        setCategory({...category, [name]:event.target.value})
    }

    const onSubmit= event=>{
        event.preventDefault()
        setError('')
        setSuccess(false)
        console.log(typeof(product_type))
        CreateCategory(user._id, token, {product_type, name})
        .then(data=>{
            if(data.error || data.err){
                setError(true)
            }
            else{
                setError('')
                setSuccess(true)
                setCategory({...category, product_type:'', name: ''})
            }
        })
    }

    const successMessage= ()=>{
        if(success){
            return (
            <div className='alert alert-info'>
            <h4 className='text-success'>Category Created Successfully</h4>
            </div>
            )
        }
    }

    const errorMessage= ()=>{
        if(error){
            return(
                <div className='alert alert-info'>
                 <h4 className='text-danger'>Category creation Failed</h4>
                 </div>
            )
        }
    }

    const myCategoryForm= ()=>(
        <form>
        <div className='form-group'>
        <h3 className='lead text-info bold '>Enter the category</h3>
        <input className='form-control my-3'
        type='text' autoFocus
        onChange= {handleChange('product_type')}
        value={product_type}
        required
        placeholder='For Ex. Shoes'
        />

        <input className='form-control my-3'
        type='text' autoFocus
        onChange= {handleChange('name')}
        value={name}
        required
        placeholder='For Ex. Summer'
        />
        <button className='btn btn-outline-info'
        onClick= {onSubmit}
        >Create Category</button>
        </div>
        
        </form>
    )





    return(
        <Base title='Create Category here' description='Add new categories for products here' className='container category-block p-4 '>
        <div className='row  rounded'>
        <div className='col-md-8 offset-md-2'>
        {successMessage()}
        {errorMessage()}
        {myCategoryForm()}
        {goBack()}
        </div>
        </div>
        
        </Base>
    )
}

export default AddCategory