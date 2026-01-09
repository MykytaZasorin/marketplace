import { useEffect, useMemo, useState, useRef } from 'react';
import { TextField, Typography, Box, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css';

import CategorySlide from '../../components/CategorySlide';
import styles from './ProductList.module.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/products')
      .then(res => {
        if (Array.isArray(res.data)) setProducts(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
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

  if (loading) {
    return (
      <Box className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Stay in step with progress
      </Typography>

      <Box className={styles.filters}>
        <TextField
          label="Search product"
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TextField
          label="Max price"
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className={styles.maxPriceField}
        />
      </Box>

      {categories.length ? (
        <Box>
          <Box className={styles.categoryHeader}>
            <IconButton onClick={() => swiperRef.current?.slidePrev()}>
              <ArrowBackIosIcon />
            </IconButton>

            <Typography variant="h5" className={styles.categoryTitle}>
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
          >
            {categories.map(([category, items]) => (
              <SwiperSlide key={category} className={styles.swiperSlide}>
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
