import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'antd'
import ItemsCard from '../components/ItemsCard'
import { useDispatch } from 'react-redux'

const HomePage = () => {
  const dispatch = useDispatch()
  const [itemsData, setItemsData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('burger')

  const categorise = [
    {
      name: 'pizza',
      imageURL: 'https://i.ibb.co/DRmfpTN/Deluxe-Veggie-Pizza.png'
    },
     {
      name: 'burger',
      imageURL: 'https://i.ibb.co/z2jWQvt/Jazz-Burger.png'
    },
      {
      name: 'Drinks',
      imageURL: 'https://i.ibb.co/MDmSQmn/d6.png'
    },
       {
      name: 'Icecreame',
      imageURL: 'https://i.ibb.co/Sd16rWr/i1.png'
    },
  ]

  const getAllItems = async () => {

    dispatch({type: 'showLoading'})
    await axios.get('/api/items/get-all-items').then((res) => {

      dispatch({type: 'hideLoading'})
      setItemsData(res.data);

    }).catch((error) => {
      
      dispatch({type: 'hideLoading'})
      console.log(error);
    })
  }
  useEffect(() => {
    getAllItems()
  }, [])
  
  return (
    <DefaultLayout>
      <div className='d-flex categorise'>
        {
          categorise.map((category) => (
            <div onClick={()=>setSelectedCategory(category.name)} className={`d-flex category ${selectedCategory === category.name && 'select-category'}`}>
              <h4>{category.name}</h4>
              <img src={category.imageURL} alt="category image" srcset="" height='60' width='70' />
              </div>
          ))
        }
      </div>

      <Row justify="space-between" align="middle" gutter={20}>
        {
          itemsData.filter((i)=>i.category == selectedCategory).map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemsCard item={ item} />
            </Col>
          ))
              }
          </Row>
    </DefaultLayout>
  )
}

export default HomePage