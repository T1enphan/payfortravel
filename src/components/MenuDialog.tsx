import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Link from 'next/link';

export const MenuDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { 
      text: 'Trang chủ', 
      icon: <HomeIcon />, 
      href: '/' 
    },
    { 
      text: 'Tính chi tiêu nhóm', 
      icon: <CalculateIcon />, 
      href: '/expense' 
    },
    { 
      text: 'Địa điểm du lịch', 
      icon: <TravelExploreIcon />, 
      href: '/travel' 
    }
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClickOpen}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 300,
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
                  cursor: 'pointer'
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}; 