import React,{useEffect,useState} from 'react'

import '../styles.css'
import {API} from '../backend'
import Base from './Base'
import Card from './Card'
import { getAllProducts } from '../admin/helper/adminapicall'




const Home =()=>{
    const [products,setProducts]= useState([])
    const [error,setError]= useState(false)
    
    const loadAllProducts= ()=>{
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
        }
        )
    }

    useEffect(()=>{
        loadAllProducts()
    }, [])

    return(
        <Base title='Home page' description='first react page'>

        <div className='row align-content-center'>
        
        
        {products.map((product,index)=>{
            return(
                <div key={index} className='col-md-3 mb-3'> 
                <Card product={product}/>
                </div>
            )
        })}
        
        
       
        
        </div>
        


        </Base>
    )

}

export default Home