import { AppBar, Toolbar, Typography } from '@mui/material';

export default function AdminHeader() {
  return (
    <AppBar position="static" sx={{ background: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6">Admin Panel</Typography>
      </Toolbar>
    </AppBar>
  );
}
