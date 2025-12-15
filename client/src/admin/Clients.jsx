import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(
          'https://marketplace-production-2e6c.up.railway.app/users'
        );
        const data = await res.json();
        const filteredClients = data.filter(client => client.role !== 'admin');
        setClients(filteredClients);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography align="center" variant="h4" sx={{ mb: 2 }}>
        Clients
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client._id}>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
