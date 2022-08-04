import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import '../resources/bills.css'
import '../resources/item.css'

const Customer = () => {

  const dispatch = useDispatch()
  const [billData, setBillData] = useState([])
 
    
  const getAllBillsData = async () => {
    dispatch({type: 'showLoading'})
    await axios.get('/api/bills/get-all-bills').then((res) => {

      dispatch({type: 'hideLoading'})
      const data = res.data
      data.reverse()
      setBillData(data);

    }).catch((error) => {
      
      dispatch({type: 'hideLoading'})
      console.log(error);
    })
    }
    
   
  useEffect(() => {
    getAllBillsData()
  }, [])

  const columns = [
      
        {
            title: 'Customer',
            dataIndex: 'customerName',
        },
        {
          title: 'Customer Phone',
          dataIndex:'customerPhoneNumber'
        },
        
        {
            title: 'Payment Mode',
            dataIndex: 'paymentMode'
        },
          {
            title: 'Created on',
            dataIndex: 'createdAt',
              render: (value) => (
                <span>
                    {value.toString().substring(0,10)}  
                </span>
            )
        },
      
    ]

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customer Details</h3>
      </div>
    <Table columns={columns} dataSource={billData} />     
    </DefaultLayout>
  )
}

export default Customer