import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

interface Expense {
  payer: string;
  amount: number;
  description: string;
  dateTime: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  members: string[];
}

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const ExpenseList = ({ expenses, members }: ExpenseListProps) => {
  // Tính tổng tiền
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Tính số tiền mỗi người cần đóng
  const amountPerPerson = members.length > 0 ? totalAmount / members.length : 0;

  // Sắp xếp chi tiêu theo thời gian mới nhất
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Danh sách chi tiêu
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Số người trong nhóm"
          value={members.length}
          InputProps={{
            readOnly: true,
          }}
          sx={{ width: 200 }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="danh sách chi tiêu">
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="right">Người chi</TableCell>
              <TableCell align="right">Số tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedExpenses.map((expense, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {new Date(expense.dateTime).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell component="th" scope="row">
                  {expense.description}
                </TableCell>
                <TableCell align="right">{expense.payer}</TableCell>
                <TableCell align="right">
                  {formatCurrency(expense.amount)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Tổng cộng:
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(totalAmount)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {members.length > 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Số tiền mỗi người cần đóng: {formatCurrency(amountPerPerson)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 