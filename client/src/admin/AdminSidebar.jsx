import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List sx={{ width: 240 }}>
        <ListItemButton onClick={() => navigate('/admin/products')}>
          <StoreIcon sx={{ mr: 1 }} />
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/addproduct')}>
          <AddIcon sx={{ mr: 1 }} />
          <ListItemText primary="Add Product" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/clients')}>
          <PeopleIcon sx={{ mr: 1 }} />
          <ListItemText primary="Clients" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/dashboard')}>
          <DashboardIcon sx={{ mr: 1 }} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
