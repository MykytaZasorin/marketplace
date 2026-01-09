import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function ProductCard({ product, isLoggedIn }) {
  const [quantity, setQuantity] = useState(1);

  const shortDescription =
    product.description?.length > 60
      ? product.description.slice(0, 60) + '...'
      : product.description;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setQuantity(1);
      iziToast.info({
        title: 'Увага!',
        message: 'Будь ласка, авторизуйтеся щоб додати товар у кошик.',
        position: 'topRight',
        timeout: 5000,
        balloon: true,
        close: true,
        buttons: [
          [
            '<button>Авторизуватися</button>',
            function (instance, toast) {
              window.location.href = '/login';
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            },
            true,
          ],
        ],
      });
      return;
    }

    if (!product.stock || product.stock <= 0) {
      setQuantity(1);
      iziToast.error({
        title: 'Error',
        message: 'Нажаль, товар закінчився!',
        position: 'topRight',
      });
      return;
    }

    iziToast.success({
      title: 'Success',
      message: `${product.title} (${quantity}) додано до кошика!`,
      position: 'topRight',
    });

    console.log('Added to cart:', product.title, 'Quantity:', quantity);
  };

  return (
    <Box component="li" className={styles.card}>
      {/* Лінк тільки на зображення та текст */}
      <Link to={`/products/${product._id}`} className={styles.link}>
        <Box
          component="img"
          src={product.image || 'https://picsum.photos/300'}
          alt={product.title}
          className={styles.img}
        />
        <Typography variant="subtitle1" className={styles.cardTitle}>
          {product.title}
        </Typography>
        {shortDescription && (
          <Typography variant="body2" className={styles.cardDescription}>
            {shortDescription}
          </Typography>
        )}
      </Link>

      {/* Блок кількості + кнопки поза Link */}
      <Box className={styles.cardFooter}>
        <Typography
          variant="body2"
          className={styles.cardPrice}
          sx={{ fontSize: '1.4rem' }}
        >
          {product.price}$
        </Typography>

        <Box className={styles.quantityContainer}>
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 24, padding: '1px 0', fontSize: '0.85rem' }}
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className={styles.quantityButton}
          >
            -
          </Button>

          <Box className={styles.quantityNumber}>{quantity}</Box>

          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 24, padding: '1px 0', fontSize: '0.85rem' }}
            onClick={() =>
              setQuantity(q => Math.min(product.stock || 10, q + 1))
            }
            className={styles.quantityButton}
          >
            +
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={handleAddToCart}
            className={styles.addToCartButton}
          >
            <ShoppingCartIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
