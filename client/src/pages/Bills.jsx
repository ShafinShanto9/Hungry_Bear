import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {DeleteOutlined,EditOutlined,EyeOutlined} from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import '../resources/item.css'
import '../resources/bills.css'
import { useReactToPrint } from 'react-to-print';

const Bills = () => {

  const dispatch = useDispatch()
  const [billData, setBillData] = useState([])
  const [printBillModalVisibility, setPrintBillModalVisibility] = useState(false)
  const [selectedBill, setSellectedBill] = useState(null)
  const componentRef = useRef();
    

  const getAllBillsData = async () => {
    dispatch({type: 'showLoading'})
    await axios.get('/api/bills/get-all-bills').then((res) => {

      dispatch({ type: 'hideLoading' })
      const data = res.data
      data.reverse()
      setBillData(data);

    }).catch((error) => {
      
      dispatch({type: 'hideLoading'})
      console.log(error);
    })
    }
    
    const billDetailscolumns = [
        {
            title: 'Name',
            dataIndex: 'name'
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
                    <b>{record?.quantity}</b>                  
                </div>
            )
        },
        {
            title: 'Total Fare',
            dataIndex: '_id',
            render: (id, record) => (
                <div>
                    <b>{ (record.quantity * record.price) }</b>
                </div> 
            )
        },
       
    ]


  useEffect(() => {
    getAllBillsData()
  }, [])

  const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
        },
        {
          title: 'Sub Amount',
          dataIndex:'subTotal'
        },
        
        {
            title: 'TAX',
            dataIndex: 'Tax'
        },
          {
            title: 'Total Amount',
            dataIndex: 'TotalAmount'
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) => (
            <div className='d-flex'>
                <EyeOutlined className='mx-2' onClick={() => {
                    setSellectedBill(record)
                    setPrintBillModalVisibility(true)    
              }}/>  
            </div>
            )
        }
    ]

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bill Details</h3>
      </div>
    <Table columns={columns} dataSource={billData} />
    {
        printBillModalVisibility && (
            <Modal
            onCancel={() => {
                setPrintBillModalVisibility(false)
            }}
            visible={printBillModalVisibility}
            title='Bill Details'
            footer={false}
            width={800}         
            >
            <div className='bill-modal p-3' ref={componentRef}>
                    <div className='d-flex justify-content-between bill-header border-dashed'>
                        <div className="bill-paper-logo" >
                            <img src="https://i.ibb.co/dpng4c6/bear-logo.png" alt="" srcset="" />
                            <h3>HUNGRY BEAR </h3>
                        </div>
                        <div className='bill-adress'>
                          <p>MM Road, Jahore</p>
                           <p>Jashore, 7400</p> 
                           <p>+880 1745625855</p>       
                                  
                        </div>      
                    </div>
                    <div className="customer-bill-details my-3">
                        <p><b>Customer Name</b>: {selectedBill.customerName}</p>     
                        <p><b>Customer Phone</b>: {selectedBill.customerPhoneNumber}</p>     
                        <p><b>Date</b>: {selectedBill.createdAt.toString().substring(0,10)}</p>     
                </div> 

                <div className='mt-2'>
                    <p><b>Your Product List</b></p>
                    <Table columns={billDetailscolumns} dataSource={selectedBill.cartItems} pagination={false} />          
                </div>
                          
                <div className='border-dashed pb-2'>
                    <p><b>SUB TOTAL</b>: $ {selectedBill.subTotal }</p>         
                    <p><b>TAX</b>: $ {selectedBill.Tax }</p>         
                </div>
                <div className='border-dashed my-2'>
                    <h4>GRAND TOTAL: $ { selectedBill.TotalAmount}</h4>          
                </div>   
                <div className='text-center'>
                    <p>Have a good day 😊</p>          
                </div>          
             </div>  
              <div className='d-flex justify-content-end'>
            <button
                onClick={()=>handlePrint()}              
              className='px-4 py-2'
              type='submit'
              style={{ backgroundColor: '#9E6051', color: 'white', border: 'none', textAlign: 'center', borderRadius: '5px' }}>
              PRINT BILL</button>
          </div>
            </Modal>          
        )          
    }      
    </DefaultLayout>
  )
}

export default Bills