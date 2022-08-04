import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'


const ItemsCard = ({ item }) => {

  const dispatch = useDispatch()
  
  const addToCart = () => {
    dispatch({type:'addToCart', payload: {...item, quantity:1}})
  }
  return (
    <div className="card" style={{ width: '18rem', border: "none", marginTop: "20px", padding: "10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
      <div className='p-3 d-flex justify-content-center align-items-center w-100'>
           <img className="card-img-top img-responsive img-fluid w-75 card-img" src={item?.Image} alt="Card image cap" style={{ height:'130px'}}  />
      </div>
    <div className="card-body d-flex justify-content-between align-items-center">
    <div>
        <h5 >{ item?.name.slice(0,10)}..</h5>
        <h5 className="card-text">Price ${ item?.price}</h5>
    </div>
      <div>
          <button
            onClick={()=>addToCart()}
          className="btn btn-primary" style={{ backgroundColor: '#9E6051', border: 'none', }}>
           Add To Listing</button>
    </div>         
  </div>
</div>
  )
}

export default ItemsCard