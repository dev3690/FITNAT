


import { useState, useEffect } from 'react';

import {
  Card,
  Stack,
  Table,
  Button,
  Dialog,
  Container,
  TableBody,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { getLocalItem } from 'src/utils/local_operations';
import { getData, PATIENT,callAxiosApi,insertPatient } from 'src/utils/api_utils';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import UserTableHead from './user-table-head';
import PatientTableRow from './patient-table-row';
import UserTableToolbar from './user-table-toolbar';
import { applyFilter, getComparator } from './utils';

const apiUrl = 'http://localhost:3690/getData'; // Replace with your API URL

export default function Ex1() {
  const [patient, setPatient] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await callAxiosApi(getData,{table:PATIENT})
      console.log(">>>>>>>",response)
      setPatient(response.data.data); // Assuming response.data contains the data array
    } catch (error) {
      console.error('Failed to fetch patient:', error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    try {
      // Perform delete operation on backend if needed
      // For this example, we are just updating the state
      setPatient(patient.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentPatient({});
    setIsEditing(false);
  };

  const handleDialogSave = async() => {
    if (isEditing) {
      try {
        // Perform update operation on backend if needed
        // For this example, we are just updating the state
        setPatient(patient.map((patient) => (patient.id === currentPatient.id ? currentPatient : patient)));
      } catch (error) {
        console.error('Failed to update patient:', error);
      }
    } else {
      const localData = getLocalItem("data")
      const response = await callAxiosApi(insertPatient,{...currentPatient,type_id:localData?.type_id,created_by:localData?.id})
      console.log(">>>>>>>",response)
      setPatient([...patient, { ...currentPatient, id: patient.length + 1 }]); // Assuming no ID is returned from backend
    }
    handleDialogClose();
  };

  const handleAddNewUser = () => {
    // setCurrentPatient({ name: '', number: '', role: '', isVerified: false, status: 'Inactive' });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPatient({ ...currentPatient, [name]: value });
  };

  const dataFiltered = applyFilter({
    inputData: patient,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Patients</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddNewUser}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={patient.length}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'city', label: 'City' },
                  { id: 'pain', label: 'Pain' },
                  { id: 'url', label: 'URL' },
                  { id: 'start_date', label: 'Start Date' },
                  { id: 'end_date', label: 'End Date' },
                  { id: 'package', label: 'Package' },
                  { id: 'created_by', label: 'Created By' },
                  { id: 'type_id', label: 'Type ID' },
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
                onRequestSort={handleSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PatientTableRow row={row}/>
                  ))}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, patient.length)}
                /> */}

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={patient.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentPatient?.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="mobile"
            label="Mobile"
            type="text"
            fullWidth
            value={currentPatient?.mobile || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={currentPatient?.city || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="pain"
            label="Pain"
            type="text"
            fullWidth
            value={currentPatient?.pain || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="url"
            label="URL"
            type="text"
            fullWidth
            value={currentPatient?.url || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="start_date"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={currentPatient?.start_date || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="end_date"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={currentPatient?.end_date || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="package"
            label="Package"
            // type="text"
            fullWidth
            value={currentPatient?.package || ''}
            onChange={handleInputChange}
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave}>{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
