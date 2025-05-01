import { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface AddExpenseProps {
  members: string[];
  onAddExpense: (payer: string, amount: number, description: string, dateTime: string) => void;
}

export const AddExpense = ({ members, onAddExpense }: AddExpenseProps) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payer && amount && description) {
      const currentDateTime = new Date().toISOString();
      onAddExpense(payer, parseFloat(amount), description, currentDateTime);
      setAmount('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Người chi</InputLabel>
        <Select
          value={payer}
          label="Người chi"
          onChange={(e) => setPayer(e.target.value)}
          required
        >
          {members.map((member) => (
            <MenuItem key={member} value={member}>
              {member}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Số tiền"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Thêm chi tiêu
      </Button>
    </Box>
  );
}; 