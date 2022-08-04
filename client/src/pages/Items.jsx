import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import '../resources/item.css'

const Items = () => {

  const dispatch = useDispatch()
  const [itemsData, setItemsData] = useState([])
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

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

   const deleteItem = async (record) => {
    dispatch({type: 'showLoading'})
     await axios.post('/api/items/delete-item', {itemId: record._id})
       .then((res) => {
         dispatch({ type: 'hideLoading' })
         message.success('Item Deleted Successfully')
          getAllItems()
      }).catch((error) => {    
        dispatch({ type: 'hideLoading' })
        message.error('something went wrong')
        console.log(error);
    })
  }


  useEffect(() => {
    getAllItems()
  }, [])

  const onFinish = async(values) => {

    dispatch({ type: 'showLoading' })
    
    if (editingItem === null) {
      await axios.post('/api/items/add-item', values).then((res) => {
      dispatch({ type: 'hideLoading' })
      message.success('Item added successfully')
      setAddEditModalVisibility(false)
      getAllItems()

    }).catch((error) => {
      dispatch({ type: 'hideLoading' })
      message.error('something went wrong')
      console.log(error);

    })
    } else {
       await axios.post('/api/items/edit-item', {...values, itemId: editingItem._id}).then((res) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item Updated successfully')
        setEditingItem(null)
        setAddEditModalVisibility(false)
        getAllItems()

    }).catch((error) => {
      dispatch({ type: 'hideLoading' })
      message.error('something went wrong')
      console.log(error);

    })
   }

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
          title: 'Category',
          dataIndex:'category'
        },
        
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Action',
            dataIndex: '_id',
          render: (id, record) => (
            <div className='d-flex'>
              <EditOutlined className='mx-2' onClick={() => {
                setEditingItem(record)
                setAddEditModalVisibility(true)

              }} />
              <DeleteOutlined className='mx-2' onClick={()=>deleteItem(record)}/>  
            </div>
            )
        }
    ]


  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Product Items</h3>
        <button
          className='px-4'
          onClick={()=>setAddEditModalVisibility(true)}
          style={{ backgroundColor: '#9E6051', color: 'white', border: 'none', textAlign: 'center', borderRadius: '5px' }}>Add Item</button>
      </div>
      <Table columns={columns} dataSource={itemsData} />

      {
        addEditModalVisibility && (
          <Modal
            onCancel={() => {
            setEditingItem(null)
            setAddEditModalVisibility(false)
            }}
            visible={addEditModalVisibility}
            title={`${editingItem !== null ? 'Edit Items' : 'Add New Items'}`}
            footer={false}>

        <Form initialValues={editingItem} layout='vertical' onFinish={onFinish}>

          <Form.Item name='name' label='Product Name'>
            <Input   />
          </Form.Item>
          <Form.Item name='price' label='Product Price'>
            <Input />
          </Form.Item>
          <Form.Item name='Image' label='Product Image Url'>
            <Input   />
          </Form.Item>
          <Form.Item name='category' label='Product Category'>
            <Select>
              <Select.Option value='burger' >Burger</Select.Option>
              <Select.Option value='pizza' >Pizza</Select.Option>
              <Select.Option value='dirnks' >Drinks</Select.Option>
              <Select.Option value='icecreame' >Ice-Creame</Select.Option>
            </Select>
          </Form.Item>

          <div className='d-flex justify-content-end'>
             <button
              className='px-4 py-2'
              type='submit'
              >
              Save</button>
          </div>

        </Form>

      </Modal>
        )
      }
    </DefaultLayout>
  )
}

export default Items