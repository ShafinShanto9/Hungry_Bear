import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../resources/layout.css'
import ProfileCard from './ProfileCard';
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector(state => state.rootReducer)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  }, [cartItems])
  
  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div class="spinner-border" role="status">
          </div>  
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {
          collapsed ? <div className='mb-5'><h2 className='text-center'><b>H <span style={{ color: '#9E6051' }}>B</span></b> </h2></div>
          : <div className="logo" >
          <img src="https://i.ibb.co/dpng4c6/bear-logo.png" alt="" srcset="" />
          <h3>HUNGRY BEAR </h3>
        </div> 
        }
        <Menu
          theme='dark'
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          className={`${collapsed && 'pt-5'}`}
        >
          <Menu.Item key='/home' icon={<HomeOutlined />}>
            <Link to='/home'> Home </Link>
          </Menu.Item>
          <Menu.Item key='/cart' icon={<ShoppingCartOutlined />}>
            <Link to='/cart'> Cart </Link>
          </Menu.Item>
          <Menu.Item key='/bills' icon={<SnippetsOutlined />}>
            <Link to='/bills'>Bills</Link>
          </Menu.Item>
          <Menu.Item key='/item' icon={<UnorderedListOutlined />}>
            <Link to='/item'>Items</Link>
          </Menu.Item>
          <Menu.Item key='/customer' icon={<UserOutlined/>}>
            <Link to='/customer'>Customer</Link>
          </Menu.Item>
          <Menu.Item key='5' icon={<LoginOutlined />} onClick={() => {
            localStorage.removeItem('pos-user')
            navigate('/login')
          }}>
            Logout
          </Menu.Item>

        </Menu>
        <div>
          {!collapsed && <ProfileCard/>}
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 10,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        
          <div
            onClick={()=>{navigate('/cart')}}
            className='cart-count d-flex align-items-center font-weight-bold mr-2 
            '>
              <ShoppingCartOutlined />
              <p className=''>{cartItems.length}</p>
            </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '10px',
            padding: 24,
            minHeight: '80vh',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout