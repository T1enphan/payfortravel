import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Checkbox,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';

interface Place {
  id: string;
  name: string;
  address: string;
  note: string;
  isVisited: boolean;
}

export const TravelPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [newPlace, setNewPlace] = useState({ name: '', address: '', note: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlace.name.trim()) {
      const place: Place = {
        id: Date.now().toString(),
        name: newPlace.name.trim(),
        address: newPlace.address.trim(),
        note: newPlace.note.trim(),
        isVisited: false
      };
      setPlaces([...places, place]);
      setNewPlace({ name: '', address: '', note: '' });
      setOpenDialog(false);
    }
  };

  const handleDeletePlace = (id: string) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  const handleToggleVisited = (id: string) => {
    setPlaces(places.map(place => 
      place.id === id ? { ...place, isVisited: !place.isVisited } : place
    ));
  };

  const handleEditPlace = (place: Place) => {
    setNewPlace({
      name: place.name,
      address: place.address,
      note: place.note
    });
    setEditingId(place.id);
    setOpenDialog(true);
  };

  const handleUpdatePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId && newPlace.name.trim()) {
      setPlaces(places.map(place => 
        place.id === editingId 
          ? { ...place, name: newPlace.name.trim(), address: newPlace.address.trim(), note: newPlace.note.trim() }
          : place
      ));
      setNewPlace({ name: '', address: '', note: '' });
      setEditingId(null);
      setOpenDialog(false);
    }
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Danh sách địa điểm du lịch
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setNewPlace({ name: '', address: '', note: '' });
            setEditingId(null);
            setOpenDialog(true);
          }}
        >
          Thêm địa điểm
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Đã đến</TableCell>
              <TableCell>Tên địa điểm</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Ghi chú</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {places.map((place) => (
              <TableRow key={place.id}>
                <TableCell>
                  <Checkbox
                    checked={place.isVisited}
                    onChange={() => handleToggleVisited(place.id)}
                  />
                </TableCell>
                <TableCell>{place.name}</TableCell>
                <TableCell>{place.address}</TableCell>
                <TableCell>{place.note}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Xem trên bản đồ">
                    <IconButton onClick={() => openGoogleMaps(place.address)}>
                      <MapIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEditPlace(place)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton onClick={() => handleDeletePlace(place.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingId ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={editingId ? handleUpdatePlace : handleAddPlace} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Tên địa điểm"
              value={newPlace.name}
              onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Địa chỉ"
              value={newPlace.address}
              onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })}
              fullWidth
            />
            <TextField
              label="Ghi chú"
              value={newPlace.note}
              onChange={(e) => setNewPlace({ ...newPlace, note: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button 
            onClick={editingId ? handleUpdatePlace : handleAddPlace} 
            variant="contained" 
            color="primary"
          >
            {editingId ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 