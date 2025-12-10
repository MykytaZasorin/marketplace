import { Paper, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">Sales statistic</Typography>
      <Typography sx={{ mt: 2 }}>
        Тут будуть графіки, статистика та загальний огляд.
      </Typography>
    </Paper>
  );
}
