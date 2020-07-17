import React ,{useState, useEffect} from 'react'
import Base from '../core/Base'
import { API } from '../backend'
import { getAllCategories, CreateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const AddProduct= ()=>{

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

    }

    const onSubmit= event=>{
        event.preventDefault()
        setvalues({...values, loading:true, error:''})
        CreateProduct(user._id, token, formData)
        .then(data=>{
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
        <h4>{createdProduct} created successfully</h4>
        </div>
    )

    const errorMessage= ()=>(
        <div className='alert alert-danger mt-3'
        style= {{display: error ? '' : 'none'}}>
        <h4>Product creation failed</h4>
        </div>
    )

    const preload= ()=>{
        
       
        
        getAllCategories()
        .then(data=>{
          console.log(data)
            if(data.error){
                setvalues({...values, error:data.error})
            }
            else if(data.err){
                setvalues({...values, error:data.err})
            }
            else{
                setvalues({...values, categories:data, formData: new FormData()})
                console.log(categories)
            }
        })
    }

    useEffect(()=>{
        preload()
    }, [])


  const dropdown= (categories)=>{

      
        const main_item=[]
        var index= 0;
        while(index< categories.length){
          var temp= categories[index].product_type
          var i= index
        const options=[]
        while( i< categories.length && categories[i].product_type===temp){
          options.push(<option key={i} value={categories[i]._id}> {categories[i].name}</option>)
          i++;
        }
        main_item.push(
          <optgroup label={categories[index].product_type} >
          
           {options}
        
        </optgroup>
        )
        index=i;
        }
        return main_item
  }
    



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
          
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="categogry"
              onfocus='size=5'
              
              
            >
            <option className='bold'>Select</option>

           


              {categories  && 

                
                dropdown(categories)
                

                // categories.map((cate,index)=>(
                //     <option key={index} value={cate._id}>
                //     {cate.product_type}
                //     </option>
                // ))
                } 
              
            </select>
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
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-info">
            Create Product
          </button>
        </form>
      );
    
    return(
        <Base title='Add New Products' description='Create new products from here' className='container category-block p-4'>
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

export default AddProduct