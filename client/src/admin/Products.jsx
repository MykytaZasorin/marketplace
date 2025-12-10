import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const displayedProducts = products
    .filter(
      p => p.title && p.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortOrder === 'asc')
        return Number(a[sortField]) - Number(b[sortField]);
      return Number(b[sortField]) - Number(a[sortField]);
    });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography align="center" variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="Enter name"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{ mb: 2, mr: 2 }}
        />

        <FormControl sx={{ mb: 2, minWidth: 150 }}>
          <InputLabel>Sorted by</InputLabel>
          <Select
            value={sortField}
            onChange={e => setSortField(e.target.value)}
            label="Сортувати за"
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="stock">Available</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 2, minWidth: 120, ml: 2 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            label="Порядок"
          >
            <MenuItem value="asc">toHighest</MenuItem>
            <MenuItem value="desc">toLower</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedProducts.map(product => (
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
