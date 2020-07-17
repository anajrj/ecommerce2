import React,{useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { CartEmpty, loadCart } from './helper/coreapicalls'
import { Link } from 'react-router-dom'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'



const StripeCheckout= ({products, setReload= f=>f, reload=undefined})=>{

    const {user,token}= isAuthenticated()

    const [data, setData]= useState({
        loading:false,
        success:false,
        error:'',
        address:''
    })

    const make_payment= token=>{
        const body= {
            token,
            products
        }
        const headers= {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }

        ).then(response=>console.log(response))
    }

    const getTotalCartPrice= ()=>{
        let amount=0;
        products.map(p=>{
            amount= amount+p.price
        })
        return amount
    }

    const CheckoutButton= ()=>{
        return (
            isAuthenticated() ? (
                <div className='btn btn-outline-success mt-3'>Pay ${getTotalCartPrice()}</div>
            ) : (
                <Link className='btn btn-warning mt-3' to='/signin'>SignIn</Link>
            )
        )
    }
    

    return(
        <div className='text-white'>
        <div className='bg-info' > Total Cart Price: <strong> {getTotalCartPrice()}</strong></div>
        <StripeCheckoutButton name='make payment' amount={getTotalCartPrice()*100} stripeKey='pk_test_51Gzg9lAe9QUHkBRfngIJUnXPBgmxb6UJkdoAY3Kn94JoCYMJvYRRAUFVdNYtOdylpGcFJegH5z7LkCNrcSth2I4100DiD0xTtJ' token={make_payment}>
        {CheckoutButton()}
        </StripeCheckoutButton>
        </div>
    )

}

export default StripeCheckout