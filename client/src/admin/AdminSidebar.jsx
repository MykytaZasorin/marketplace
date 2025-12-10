import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List sx={{ width: 240 }}>
        <ListItemButton onClick={() => navigate('/admin/dashboard')}>
          <DashboardIcon sx={{ mr: 1 }} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/products')}>
          <StoreIcon sx={{ mr: 1 }} />
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/clients')}>
          <StoreIcon sx={{ mr: 1 }} />
          <ListItemText primary="Clients" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
