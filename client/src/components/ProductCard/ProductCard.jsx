import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const shortDescription =
    product.description?.length > 60
      ? product.description.slice(0, 60) + '...'
      : product.description;

  return (
    <Box component="li" className={styles.card}>
      <Link to={`/products/${product._id}`} className={styles.link}>
        {/* Зображення */}
        <Box
          component="img"
          src={product.image || 'https://picsum.photos/300'}
          alt={product.title}
          className={styles.img}
        />

        {/* Назва товару */}
        <Typography variant="subtitle1" className={styles.cardTitle}>
          {product.title}
        </Typography>

        {/* Опис */}
        {shortDescription && (
          <Typography variant="body2" className={styles.cardDescription}>
            {shortDescription}
          </Typography>
        )}

        <Box className={styles.cardPrice}>
          <Typography variant="body2">Price: {product.price}$</Typography>
        </Box>
      </Link>
    </Box>
  );
}
