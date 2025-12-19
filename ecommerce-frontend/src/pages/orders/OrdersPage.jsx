import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import { Header } from '../../components/Header'
import './OrdersPage.css'
import { OrdersGrid } from './OrdersGrid';
import api from "./api/axios";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await api.get('/api/orders?expand=products')
      setOrders(response.data)
    }

    fetchOrderData();
  }, [])

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={ orders } loadCart={ loadCart }/>
      </div>
    </>
  )
}