import { Paper, Typography } from '@mui/material';

export default function Products() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">Products</Typography>
      <Typography sx={{ mt: 2 }}>Тут буде таблиця товарів</Typography>
    </Paper>
  );
}
