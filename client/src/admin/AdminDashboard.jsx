import { Grid, Paper, Typography, Box } from '@mui/material';
import { MyPieChart } from '../utils/PieChart';

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
          <Paper sx={{ p: 2, width: 150, height: 350 }}>
            <Typography variant="h6">Sales by cat</Typography>
            <MyPieChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, width: 150, height: 350 }}>
            <Typography variant="h6">Sales by month</Typography>
            <MyPieChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, width: 150, height: 350 }}>
            <Typography variant="h6">Sales by amount</Typography>
            <MyPieChart />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, width: 150, height: 350 }}>
            <Typography variant="h6">Users income</Typography>
            <MyPieChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
