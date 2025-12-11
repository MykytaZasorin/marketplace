import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else console.error('Products is not an array:', data);
      })
      .catch(err => console.error(err));
  }, []);

  const goToAdmin = () => {
    navigate('/login');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice = maxPrice ? product.price <= Number(maxPrice) : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Список товарів
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Пошук товару"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TextField
          label="Макс. ціна"
          type="number"
          variant="outlined"
          sx={{ width: 150 }}
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Link
                  to={`/products/${product._id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '100%',
                  }}
                >
                  <img
                    src={'https://picsum.photos/150'}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 6,
                      marginBottom: 12,
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {product.title}
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Ціна: {product.price} грн
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>Товари не знайдено</Typography>
        )}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" onClick={goToAdmin}>
          Вхід
        </Button>
      </Box>
    </Box>
  );
}
