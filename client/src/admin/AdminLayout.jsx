import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', background: '#f5f5f5' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AdminHeader />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
