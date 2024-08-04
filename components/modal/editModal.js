import { Modal, Box, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const EditModal = ({
  open,
  handleClose,
  formData,
  handleEditChange,
  handleEdit,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', sm: 400 }, // Responsive width
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Tenant
        </Typography>
        <TextField
          fullWidth
          label="Domain"
          margin="normal"
          name="domain"
          value={formData.domain || ''}
          onChange={handleEditChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{color: 'whitesmoke'}}>Status</InputLabel>
          <Select
            name="status"
            value={formData.status || ''}
            onChange={handleEditChange}
            label="Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleEdit(formData.id)}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
