import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';

export const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Tính chi tiêu nhóm
          </Button>
          <Button color="inherit" component={Link} href="/travel">
            Địa điểm du lịch
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 