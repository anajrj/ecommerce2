// const { API } = require("../../backend");
import {API} from '../../backend'

// category calls

// create a category
export const CreateCategory= (userId, token,cateory)=>{
    console.log(JSON.stringify(cateory))

    return(
        fetch(`${API}/category/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(cateory)
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>(console.log(err)))
    )
}

// get All categories

export const  getAllCategories =()=>{
    

    return (
        fetch(`${API}/categories`, {
            method: 'GET',
            })
        .then(response=>{
            return response.json()
        })
        .catch(err=> console.log(err))
    )
}


// Product calls

// Create a product 
export const CreateProduct= (userId, token,product)=>{

    return(
        fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=>(console.log(err)))
    )
}

// get All Products

export const  getAllProducts =()=>{
    return (
        fetch(`${API}/products`, {
            method: 'GET'
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=> console.log(err))
    )
}

// get a product
export const  getProduct =(productId)=>{
    return (
        fetch(`${API}/product/${productId}`, {
            method: 'GET'
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=> console.log(err))
    )
}


// Delete a product
export const  DeleteProduct =(productId, userId,token)=>{
    return (
        fetch(`${API}/product/${productId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${token}`}
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=> console.log(err))
    )
}

// update a product
export const UpdateProduct= (userId, token,productId, newProduct)=>{

    return(
        fetch(`${API}/product/${productId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${token}`
            },
            body: newProduct
        })
        .then(response=>{
            console.log(response)
            return response.json()
        })
        .catch(err=>(console.log(err)))
    )
}



