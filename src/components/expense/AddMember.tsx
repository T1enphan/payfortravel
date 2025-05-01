import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface AddMemberProps {
  onAddMember: (name: string) => void;
}

export const AddMember = ({ onAddMember }: AddMemberProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddMember(name.trim());
      setName('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Tên thành viên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Thêm
      </Button>
    </Box>
  );
}; 