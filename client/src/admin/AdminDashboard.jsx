import { Grid, Paper, Typography, Box } from '@mui/material';
import { PieChart } from '../utils/PieChart';

export default function Dashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Sales by category</Typography>
            <PieChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Sales by month</Typography>
            <PieChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Sales by amount</Typography>
            <PieChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Users income</Typography>
            <PieChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
