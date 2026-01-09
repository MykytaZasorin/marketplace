import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProductCard from './ProductCard/ProductCard';

export default function CategorySlide({ category, products }) {
  const itemsPerPage = 9; // 3x3
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayProducts = products.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <Box
      sx={{
        maxWidth: 1200,
        width: '100%',
        minHeight: 400,
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {displayProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>

      {/* Пагінація */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
          >
            Back
          </Button>
          <Typography sx={{ alignSelf: 'center' }}>
            {page + 1} / {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={page === totalPages - 1}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
