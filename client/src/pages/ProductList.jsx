import { useEffect, useMemo, useState, useRef } from 'react';
import { TextField, Typography, Box, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css';

import CategorySlide from '../components/CategorySlide';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activeIndex, setActiveIndex] = useState(0); // для динамічної назви категорії
  const swiperRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then(res => Array.isArray(res.data) && setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice = maxPrice ? product.price <= Number(maxPrice) : true;
      return matchesSearch && matchesPrice;
    });
  }, [products, searchTerm, maxPrice]);

  const productsByCategory = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      const category = product.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  const categories = Object.entries(productsByCategory);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Product List
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Search product"
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TextField
          label="Max price"
          type="number"
          sx={{ width: 150 }}
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </Box>

      {categories.length ? (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <IconButton onClick={() => swiperRef.current?.slidePrev()}>
              <ArrowBackIosIcon />
            </IconButton>

            <Typography
              variant="h5"
              sx={{ mx: 2, minWidth: 200, textAlign: 'center' }}
            >
              {categories[activeIndex]?.[0] || ''}
            </Typography>

            <IconButton onClick={() => swiperRef.current?.slideNext()}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            slidesPerView={1}
            onSlideChange={() => setActiveIndex(swiperRef.current.activeIndex)}
            style={{ padding: '20px 0' }}
          >
            {categories.map(([category, items]) => (
              <SwiperSlide
                key={category}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <CategorySlide category={category} products={items} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Typography>Товари не знайдено</Typography>
      )}
    </Box>
  );
}
