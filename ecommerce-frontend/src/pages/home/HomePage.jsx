import api from "../../api/axios";
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css'

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  
  useEffect(() => {
    const getHomeData = async () => {
      // const response = await api.get('/api/products')
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await api.get(urlPath);
      setProducts(response.data);
    };
    
    getHomeData();
  // }, []);
  }, [search]);
  // .then((response) => {
  //   return response.json();
  // }).then((data) => {
  //     console.log(data)
  // })
    

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={ products } loadCart={loadCart}/>
      </div>
    </>
  )
}