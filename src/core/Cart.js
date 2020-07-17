import React,{useEffect,useState} from 'react'

import '../styles.css'
import {API} from '../backend'
import Base from './Base'
import Card from './Card'
import { getAllProducts } from '../admin/helper/adminapicall'
import { loadCart } from './helper/coreapicalls'
import StripeCheckout from './StripeCheckout'




const Cart =()=>{
    const [products,setProducts]= useState([])
    const [reload, setReload]= useState(false)

    useEffect(()=>{
        setProducts(loadCart())
    }, [reload])
    
    const LoadAllCartProducts= ()=>{

        return(
            <div>
       
           {products.map((product,index)=>(
            
                <Card key={index} product={product} addtocart={false} removefromCart={true} setReload={setReload} reload={reload} />
           )
            )
        }
        </div>
        )}



    const LoadCheckout= ()=>{
        return( 
            <div>
            <h3 className='text-white'> this is checkout section</h3>
            </div>
        )
    }
    

    

    return(
        <Base title='Home page' description='first react page'>

        <div className='row '>
        
        <div className='col-3'>{LoadAllCartProducts()}</div>
        <div className='col-9'><StripeCheckout products={products} setReload={setReload} reload={reload}/></div>

        </div>
        </Base>
    )

}

export default Cart