import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`http://localhost:5000/products/${id}`)
      // .get(`https://marketplace-production-2e6c.up.railway.app/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Товар не знайдено
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Повернутися до каталогу
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Button component={Link} to="/" sx={{ mb: 3 }}>
        ← Повернутися до списку товарів
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          <Box
            component="img"
            src={product.image || 'https://picsum.photos/500'}
            alt={product.title}
            sx={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />

          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {product.title}
            </Typography>

            <Typography variant="h5" sx={{ mb: 2 }}>
              {product.price} грн
            </Typography>

            <Typography variant="body1">
              {product.description || 'Опис відсутній'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
