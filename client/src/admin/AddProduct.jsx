import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!title || !price || !stock) return;

    const newProduct = {
      title,
      description,
      price: Number(price),
      stock: Number(stock),
      imageUrl: imageUrl || 'https://via.placeholder.com/150',
    };

    try {
      await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      navigate('/admin/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add New Product
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <TextField
          label="Available"
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />

        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Create Product
        </Button>

        <Button variant="outlined" onClick={() => navigate('/admin/products')}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}
