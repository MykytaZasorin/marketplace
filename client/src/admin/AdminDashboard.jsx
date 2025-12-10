import { Paper, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">Welcome to Dashboard</Typography>
      <Typography sx={{ mt: 2 }}>
        Тут будуть графіки, статистика та загальний огляд.
      </Typography>
    </Paper>
  );
}
