import React ,{useState, useEffect} from 'react'
import Base from '../core/Base'
import { API } from '../backend'
import { getAllCategories,getProduct, UpdateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const UpdateThisProduct= ({match})=>{

    const {user, token}=isAuthenticated()

    const [values, setvalues]= useState({
        name:'',
        description:'',
        price:'',
        stock:'',
        photo:'',
        categories:[],
        category: '',
        loading:false,
        error: '',
        createdProduct: '',
        getaRedirect: false,
        formData: ''
    })

    const {name, description,price,stock, photo, categories,category,loading,error, createdProduct,getaRedirect,formData} = values
   

    const handleChange= name=>event=>{
        const value= name==='photo' ? event.target.files[0] : event.target.value

        formData.set(name,value)
        setvalues({...values, [name]:value})
        console.log(values)
        
        

    }

    const onSubmit= event=>{
        event.preventDefault()
        setvalues({...values, loading:true, error:''})
        console.log(formData)
        UpdateProduct( user._id, token,match.params.productId, formData)
        .then(data=>{
            console.log(data)
            if(data.error){
                
                setvalues({...values, error:data.error})
            }
            else if(data.err){
                
                setvalues({...values, error:data.err})
            }
            else{
                setvalues({
                    ...values,
                    name:'',
                    description: '',
                    price:'',
                    stock:'',
                    photo:'',
                    loading:false,
                    createdProduct:data.name
                })
                console.log(createdProduct)
            }
        })

    }


    const successMessage= ()=>(
        <div className='alert alert-success mt-3'
        style= {{display: createdProduct ? '' : 'none'}}>
        <h4>{createdProduct} updated successfully</h4>
        </div>
    )

    const errorMessage= ()=>(
        <div className='alert alert-danger mt-3'
        style= {{display: error ? '' : 'none'}}>
        <h4>Product updation failed</h4>
        </div>
    )

    const preload= (productId)=>{
        getProduct(productId)
        .then(data=>{
            console.log(data)
            if(data.error){
                setvalues({...values, error:data.error})
            }
            else if(data.err){
                setvalues({...values, error:data.err})
            }
            else{
                
                setvalues({
                    ...values,
                    name: data.name,
                    description:data.description,
                    price:data.price,
                    stock: data.stock,
                    category: data.category._id,
                    formData: new FormData()

                })
                preloadCategories()
                // console.log(formData)
                // console.log(values)
                
                
            }
        })
    }

    const preloadCategories= ()=>{
        getAllCategories()
        .then(data=>{
            
            if(data.error){
                setvalues({...values, error: data.error})
            }
            else if(data.err){
                setvalues({...values, error: data.err})
            }
            else{
                setvalues({
                    
                    categories: data,
                    formData:new FormData()
                })
                console.log(values)
                
            }
        })
    }

    useEffect(()=>{
        preload(match.params.productId)
        
    }, [])

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-info">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="categogry"
              
              
            >
            <option className='bold'>Select</option>
              {categories  && 
                categories.map((cate,index)=>(
                    <option key={index} value={cate._id}>
                    {cate.name}
                    </option>
                ))
                } 
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-info">
            Update Product
          </button>
        </form>
      );
    
    return(
        <Base title='Add  Products' description='Create new products from here' className='container category-block p-4'>
        <div className='row  rounded'>
        <div className='col-md-8 offset-md-2'>
        {successMessage()}
        {errorMessage()}
        {createProductForm()}
        </div>
        
        </div>
        
        </Base>
    )
}

export default UpdateThisProduct