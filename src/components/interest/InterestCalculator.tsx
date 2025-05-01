import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [time, setTime] = useState('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12; // Chuyển lãi suất hàng năm thành hàng tháng
    const n = parseFloat(time) * 12; // Chuyển số năm thành số tháng

    if (p && r && n) {
      // Công thức tính lãi suất cố định hàng tháng
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - p;

      setResults({
        monthlyPayment,
        totalPayment,
        totalInterest
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Tính toán lãi suất vay
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box component="form" onSubmit={calculateInterest} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Số tiền vay"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Lãi suất hàng năm (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Thời gian vay (năm)"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Tính toán
          </Button>
        </Box>
      </Paper>

      {results && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Khoản mục</TableCell>
                <TableCell align="right">Số tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tiền gốc</TableCell>
                <TableCell align="right">{formatCurrency(parseFloat(principal))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tiền lãi phải trả</TableCell>
                <TableCell align="right">{formatCurrency(results.totalInterest)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tổng số tiền phải trả</TableCell>
                <TableCell align="right">{formatCurrency(results.totalPayment)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tiền trả hàng tháng</TableCell>
                <TableCell align="right">{formatCurrency(results.monthlyPayment)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}; 