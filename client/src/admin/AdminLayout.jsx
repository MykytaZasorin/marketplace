import { Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', background: '#f5f5f5' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AdminHeader />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
