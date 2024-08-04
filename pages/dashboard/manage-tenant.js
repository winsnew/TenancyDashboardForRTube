import {
  Box,
  Button,
  useTheme,
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
    { field: "id", headerName: "Tenant_idName", width: 150 },
    { field: "domain", headerName: "Domain", width: 170 },
    { field: 'database', headerName: 'Database', width: 170 },
    { field: 'status', headerName: 'Status', width: 150 },
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
            onClick={() => handleDeleteOpen(params.id)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [selectedData, setSelectedData] = useState({ domain: '', status: '' });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTenantId, setDeleteTenantId] = useState(null);

  const [newData, setNewData] = useState({
    name: '',
    email: '',
    password: '',
    domain: '',
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleOpen = () => setOpen(true);
  const handleEditOpen = (data) => {
    setSelectedData(data);
    setEdit(true);
  };
  const handleClose = () => setOpen(false);
  const handleEditClose = () => {
    setOpen(false);
    setSelectedData({});
  };
  const handleDeleteOpen = (id) => {
    setDeleteTenantId(id);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => setDeleteOpen(false);


  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('/api/tenants');
        const tenantsData = response.data.map(tenant => ({
          id: tenant.id,
          name: tenant.name,
          email: tenant.email,
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
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Please log in again.");
          // Optionally redirect to login page or handle re-authentication
        } else {
          console.error("There was an error fetching the tenants!", error);
        }
      }
    };

    fetchTenants();
  }, []);

  const handleChangeAdd = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  

  const handleEditChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('/api/tenants', newData);
      setRows([...rows, response.data.tenant]);
      setNewData({ name: '', email: '', password: '', domain: '' });
      handleClose()
      window.location.reload();
    } catch (error) {
      console.error("There was an error adding the tenant!", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`/api/tenants/${id}`, {
        domain: selectedData.domain,
        status: selectedData.status,
      });
      setRows(rows.map(row => (row.id === id ? response.data.tenant : row)));
      handleEditClose();
      window.location.reload();
    } catch (error) {
      console.error('There was an error updating the tenant!', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tenants/${id}`);
      setRows(rows.filter(row => row.id !== id));
      handleDeleteClose();
      
    } catch (error) {
      console.error("There was an error deleting the tenant!", error);
      window.location.reload();
    }
  };

  return (
    <>
      <Box m="20px" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          <Box sx={{width: "140px"}}>
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

        <Box flexGrow={1} display="flex" flexDirection="column" sx={{width: "auto"}} overflow="auto">
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
        newData={newData}
        handleChange={handleChangeAdd}
        handleAdd={handleAdd}
      />
      <EditModal
      open={edit}
      handleClose={handleEditClose}
      formData={selectedData}
      handleEditChange={handleEditChange}
      handleEdit={handleEdit}
      />
      <DeleteModal
      open={deleteOpen}
      handleClose={handleDeleteClose}
      handleDelete={handleDelete}
      tenantId={deleteTenantId}
      />
    </>
  );
};

export default Tenant;
