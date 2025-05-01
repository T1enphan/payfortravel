'use client';

import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function HomePage() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng đến với ứng dụng nhảm nhảm của Neit
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Giới thiệu
        </Typography>
        <Typography paragraph>
          Ứng dụng này giúp bạn quản lý các hoạt động du lịch một cách dễ dàng và hiệu quả. 
          Với hai tính năng chính: tính toán chi tiêu nhóm và quản lý địa điểm du lịch.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Hướng dẫn sử dụng
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <CalculateIcon />
            </ListItemIcon>
            <ListItemText
              primary="Tính chi tiêu nhóm"
              secondary="Tính toán và chia sẻ chi phí giữa các thành viên trong nhóm du lịch"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <TravelExploreIcon />
            </ListItemIcon>
            <ListItemText
              primary="Quản lý địa điểm du lịch"
              secondary="Lưu trữ và quản lý các địa điểm bạn muốn đến thăm"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cách sử dụng
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Tính chi tiêu nhóm"
              secondary={
                <>
                  - Thêm các khoản chi tiêu<br />
                  - Chia sẻ chi phí giữa các thành viên<br />
                  - Xem báo cáo chi tiết
                </>
              }
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="2. Quản lý địa điểm"
              secondary={
                <>
                  - Thêm địa điểm mới<br />
                  - Đánh dấu địa điểm đã đến<br />
                  - Xem vị trí trên bản đồ<br />
                  - Thêm ghi chú cho mỗi địa điểm
                </>
              }
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
