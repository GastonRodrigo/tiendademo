import React, { useState, useEffect } from 'react';
import OrderForm from './components/OrderForm';
import OrderTable from './components/OrderTable';
import Filter from './components/Filter';
import Footer from './components/Footer';
import { Container, Typography, Box } from '@mui/material';
import { db } from './firebase'; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './App.css';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('client');
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'orders');
      const orderSnapshot = await getDocs(ordersCollection);
      const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    };
    fetchOrders();
  }, []);

  const addOrder = async (order) => {
    const docRef = await addDoc(collection(db, 'orders'), order);
    setOrders([...orders, { id: docRef.id, ...order }]);
  };

  const deleteOrder = async (orderId) => {
    await deleteDoc(doc(db, 'orders', orderId));
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const editOrder = (orderToEdit) => {
    setCurrentOrder(orderToEdit);
  };

  const updateOrder = async (updatedOrder) => {
    await updateDoc(doc(db, 'orders', updatedOrder.id), updatedOrder);
    setOrders(orders.map(order => (order.id === updatedOrder.id ? updatedOrder : order)));
    setCurrentOrder(null);
  };

  const filteredOrders = orders.filter(order =>
    order[filterField].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        AKOR Design | MyS
      </Typography>
      
      <Box display="flex" justifyContent="center" mb={2}>
        <Filter 
          filterText={filterText} 
          filterField={filterField} 
          onFilterTextChange={setFilterText} 
          onFilterFieldChange={setFilterField} 
        />
      </Box>

      <OrderForm addOrder={addOrder} currentOrder={currentOrder} updateOrder={updateOrder} />
      <Box mt={4} style={{ flexGrow: 1 }}>
        <OrderTable orders={filteredOrders} deleteOrder={deleteOrder} editOrder={editOrder} />
      </Box>

      <Footer />
    </Container>
  );
};

export default App;
