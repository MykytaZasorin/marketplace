import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography align="center" variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product._id}>
              <TableCell align="left">{product.title}</TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
