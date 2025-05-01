import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface SettlementProps {
  settlements: Settlement[];
}

export const Settlement = ({ settlements }: SettlementProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Kết quả tính toán
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="kết quả tính toán">
          <TableHead>
            <TableRow>
              <TableCell>Người trả</TableCell>
              <TableCell>Người nhận</TableCell>
              <TableCell align="right">Số tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settlements.map((settlement, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {settlement.from}
                </TableCell>
                <TableCell>{settlement.to}</TableCell>
                <TableCell align="right">
                  {settlement.amount.toLocaleString('vi-VN')}đ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 