import React,{useState,useEffect} from 'react'
import Image from './helper/Image';
import { addItemToCart, RemoveItemFromCart } from './helper/coreapicalls';
import { Redirect } from 'react-router-dom';



const Card = ({product, addtocart=true, removefromCart=false, setReload= f=>f, reload=undefined}) => {

  const [redirect, setRedirect]  = useState(false)

  const AddToCart= ()=>{
    addItemToCart(product, ()=>setRedirect(true))

  }
  
  
  const getRedirect= (redirect)=>{
    if(redirect){
      return( <Redirect
        to= '/cart' />

      )}
  }



  const showAddtoCart= addtocart=>(
        addtocart && 
        <div className="col-12">
              <button
                onClick={AddToCart}
                className="btn btn-block btn-border mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
    )

    const ShowRemovefromCart= removefromCart=>(
        removefromCart &&
        <div className="col-12">
              <button
                onClick={() => {
                  RemoveItemFromCart(product._id)
                  setReload(!reload)

                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>

    )

    return (
      <div className="card card-color category-block card-border ">
        <div className="card-header header-border header-text lead">{product.name}</div>
        <div className="card-body">
          <Image product={product}/>
          <h6>
            {product.description}
          </h6>
          <p className="btn price-btn rounded  btn-sm px-4">$ {product.price}</p>
          <div className="row">
          {showAddtoCart(addtocart)}
          {getRedirect(redirect)}
            
           {ShowRemovefromCart(removefromCart)} 
          </div>
        </div>
      </div>
    );
  };

  export default Card