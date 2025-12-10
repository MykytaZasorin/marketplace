import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function SalesStats() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch('http://localhost:5000/sales');
        const data = await res.json();
        setSalesData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSales();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Статистика продажів
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
