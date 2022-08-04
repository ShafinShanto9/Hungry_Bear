import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {DeleteOutlined, PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { useState } from 'react'
import '../resources/cartPage.css'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {

    const { cartItems } = useSelector(state => state.rootReducer)
    const dispatch = useDispatch()
    const [subTotal, setSubTotal] = useState(0)
    const [billChargeModal, setBillChargeModal] = useState(false)
    const navigate = useNavigate()
    const increaseQuantity = (record) => {
        
        dispatch({
            type: 'updateCart',
            payload: { ...record, quantity: record.quantity + 1 }
        })
    }

    const decreaseQuantity = (record) => {
        if (record.quantity !== 1) {
            dispatch({
            type: 'updateCart',
            payload: { ...record, quantity: record.quantity - 1 }
        })
        }
    }

    const deleteFromCart = (record) => {
        dispatch({type: 'deleteFromCart', payload: record})
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'Image',
            render: (Image, record)=> <img src={Image} width={60} height={60} />
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: '_id',
            render: (id, record) => (
                <div>
                    <PlusCircleOutlined className='mx-3' onClick={()=>increaseQuantity(record)}/>
                    <b>{record?.quantity}</b>
                    <MinusCircleOutlined className='mx-3' onClick={()=>decreaseQuantity(record)}/>
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record)=> <DeleteOutlined onClick={()=>deleteFromCart(record)} />
        }
    ]

    useEffect(() => {
        let tempTotal = 0

        cartItems.forEach(item => {
            tempTotal = tempTotal + (item.price * item.quantity)
        });
        setSubTotal(tempTotal)
        
    }, [cartItems])

    
    const onFinish = (values) => {
        const reqObj = {
            ...values,
            subTotal,
            cartItems,
            Tax: Number(((subTotal / 100) * 10).toFixed(2)),
            TotalAmount: Number((subTotal+ Number((subTotal / 100)*10)).toFixed(2)),
            userId: JSON.parse(localStorage.getItem('pos-user'))._id
        }
        axios.post('/api/bills/charge-bill', reqObj).then(() => {
            message.success('Bill Charged Successfully')
            navigate('/bills')
        }).catch(() => {
            message.error("something went wrong")
        })
    }


  return (
      <DefaultLayout>
          <div>CartPage</div>
          <Table columns={columns} dataSource={cartItems} pagination={false} />
          <hr />
          <div className='d-flex justify-content-end flex-column align-items-end'>
              <div className='sub-total'>
                  <h3>SUB TOTAL : $ { subTotal} </h3>
              </div>
              <button className='px-4 py-2' onClick={()=>{setBillChargeModal(true)}}>Charge Bill</button>
          </div>
          <Modal title='Charge Bill' visible={billChargeModal} footer={false}
            onCancel={() => { setBillChargeModal(false) }}>
            <Form  layout='vertical' onFinish={onFinish}>

            <Form.Item name='customerName' label='Customer Name'>
                <Input   />
            </Form.Item>
            <Form.Item name='customerPhoneNumber' label='Phone Number'>
                <Input />
            </Form.Item>
            <Form.Item name='paymentMode' label='Payment Mode'>
                <Select>
                <Select.Option value='cash' >Cash</Select.Option>
                <Select.Option value='card' >Card</Select.Option>
                <Select.Option value='mobileBanking' >Mobile Banking</Select.Option>
                </Select>
            </Form.Item>
                  
            <div className='charge-bill-amount'>
                <h5>SUBTOTAL: <b>$ {subTotal}</b></h5>
                <h5>TAX: <b>$ { ((subTotal / 100)*10).toFixed(2)}</b></h5>     
                <hr />
                <h2>GRAND TOTAL: <b>$ { (subTotal+ (subTotal / 100)*10).toFixed(2) }</b></h2>      
            </div>

          <div className='d-flex justify-content-end'>
             <button
              className='px-4 py-2'
              type='submit'
              >
              GENERATE BILL</button>
          </div>
        </Form>
          </Modal>
    </DefaultLayout>
  )
}

export default CartPage