import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ background: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Admin Panel</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Вийти
        </Button>
      </Toolbar>
    </AppBar>
  );
}
