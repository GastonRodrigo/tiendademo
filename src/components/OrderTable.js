import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const OrderTable = ({ orders, deleteOrder, editOrder }) => {
  const handleDelete = (orderId) => {
    deleteOrder(orderId);
  };

  const handleEdit = (order) => {
    editOrder(order);
  };

  const getStatusStyle = (status) => {
    return status === 'READY' ? { color: 'green' } : { color: 'red' };
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Orden</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell style={{ whiteSpace: 'nowrap', padding: '16px' }}>Cliente</TableCell>
            <TableCell style={{ whiteSpace: 'nowrap', padding: '16px' }}>Modelos</TableCell>
            <TableCell style={{ whiteSpace: 'nowrap' }}>Medidas</TableCell>
            <TableCell style={{ whiteSpace: 'nowrap' }}>Tela</TableCell>
            <TableCell style={{ width: '50px', padding: '4px' }}>EST</TableCell>
            <TableCell style={{ width: '50px', padding: '4px' }}>ENG</TableCell>
            <TableCell style={{ width: '50px', padding: '4px' }}>TAP</TableCell>
            <TableCell style={{ width: '50px', padding: '4px' }}>COR</TableCell>
            <TableCell style={{ width: '50px', padding: '4px' }}>COS</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.number}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell style={{ padding: '16px' }}>{order.client}</TableCell>
              <TableCell style={{ padding: '16px' }}>{order.model.join(', ')}</TableCell>
              <TableCell>{order.measures}</TableCell>
              <TableCell>{order.fabric}</TableCell>
              <TableCell style={{ width: '50px', padding: '4px' }}>
                <Checkbox checked={order.structure} disabled />
              </TableCell>
              <TableCell style={{ width: '50px', padding: '4px' }}>
                <Checkbox checked={order.gluing} disabled />
              </TableCell>
              <TableCell style={{ width: '50px', padding: '4px' }}>
                <Checkbox checked={order.upholstery} disabled />
              </TableCell>
              <TableCell style={{ width: '50px', padding: '4px' }}>
                <Checkbox checked={order.cutting} disabled />
              </TableCell>
              <TableCell style={{ width: '50px', padding: '4px' }}>
                <Checkbox checked={order.sewing} disabled />
              </TableCell>
              <TableCell style={getStatusStyle(order.status)}>{order.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(order)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(order.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
