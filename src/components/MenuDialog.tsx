import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Link from 'next/link';

export const MenuDialog = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const menuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, href: '/' },
    { text: 'Tính chi tiêu nhóm', icon: <CalculateIcon />, href: '/expense' },
    { text: 'Địa điểm du lịch', icon: <TravelExploreIcon />, href: '/travel' },
  ];

  return (
    <>
      {/* Header riêng cố định */}
      <AppBar position="fixed" sx={{ bgcolor: '#121212' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClickOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Neit
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Spacer để tránh che chữ */}
      <Toolbar />

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: fullScreen ? '100%' : 300,
            bgcolor: 'background.paper'
          }
        }}
      >
        <DialogTitle>Menu</DialogTitle>
        <DialogContent>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                href={item.href}
                onClick={handleClose}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  cursor: 'pointer',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};
