import {
  Box,
  Button,
  Typography,
  Container,
  useTheme,
  Toolbar,
} from "@mui/material";
import Header from "../../components/header";
import axios from "../../lib/axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../styles/theme";
import { useState, useEffect } from "react";
import AddModal from "../../components/modal/tenantModal";
import EditModal from "../../components/modal/editModal"
import DeleteModal from "../../components/modal/deleteModal";

const Tenant = () => {
  const columns = [
    { field: "id", headerName: "Name", width: 150 },
    { field: "domain", headerName: "Domain", width: 170 },
    { field: 'database', headerName: 'Database', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: "created_at", headerName: "Created_at", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="grey"
            size="small"
            onClick={() => handleEditOpen(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="grey"
            size="small"
            onClick={() => handleEdit(params.id)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    status: ''
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleOpen = () => setOpen(true);
  const handleEditOpen = (data) => {
    setFormData(data);
    setEdit(true);
  };
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEdit(false);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('/api/tenants');
        const tenantsData = response.data.map(tenant => ({
          id: tenant.id,
          domain: tenant.domain,
          database: tenant.database,
          status: tenant.status,
          created_at: new Date(tenant.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        }));
        setRows(tenantsData);
      } catch (error) {
        console.error("There was an error fetching the tenants!", error);
      }
    };

    fetchTenants();
  }, []);

  const handleChange = (e) => {
    setNewData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('/api/tenants', formData);
      setRows([...rows, response.data]);
      setFormData({ name: "", email: "", domain: "" });
      handleClose();
    } catch (error) {
      console.error("There was an error adding the tenant!", error);
    }
  };
  return (
    <>
      <Box m="20px" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleOpen}
            >
              Add Tenants
            </Button>
          </Box>
        </Box>

        <Box flexGrow={1} display="flex" flexDirection="column" overflow="auto">
          <Box flexGrow={1}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              sx={{ backgroundColor: colors.primary[400] }}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      </Box>
      <AddModal
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleChange={handleChange}
        handleAdd={handleAdd}
      />
      <EditModal
      open={edit}
      handleClose={handleEditClose}
      formData={formData}
      />
    </>
  );
};

export default Tenant;
