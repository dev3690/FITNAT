


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
  TablePagination, FormControl, InputLabel, Select, MenuItem,
  Grid,
  OutlinedInput, Box,
  CircularProgress,
  Checkbox,
  ListItemText
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

import { getLocalItem } from 'src/utils/local_operations';
import { getData, PATIENT, callAxiosApi, insertPatient, updateData, deleteData } from 'src/utils/api_utils';
import { formatDateYYMMDD } from 'src/utils/date_time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import UserTableHead from './user-table-head';
import PatientTableRow from './patient-table-row';
import UserTableToolbar from './user-table-toolbar';
import { applyFilter, getComparator } from './utils';
import { endOfDay } from 'date-fns';
import ConfirmationDialog from 'src/utils/confirmation_dialog';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://localhost:3690/getData'; // Replace with your API URL

export default function Ex1() {
  const [patient, setPatient] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [confirmation, setConfirmation] = useState(false);

  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDataUpdated, setisDataUpdated] = useState(false);
  const [deleteID, setDeleteID] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaster, setIsMaster] = useState();


  const painOptions = [
    'Headache', 'Neck Pain', 'Shoulder Pain', 'Back Pain', 'Hip Pain',
    'Knee Pain', 'Ankle Pain', 'Foot Pain', 'Elbow Pain', 'Wrist Pain',
    'Hand Pain', 'Chest Pain'
  ];


  useEffect(() => {
    fetchUsers();
    let role = getLocalItem("data")?.isMaster
    setIsMaster(role)
  }, [isDataUpdated]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true) 
      const response = await callAxiosApi(getData, { table: PATIENT })
      console.log(">>>>>>>", response)
      setPatient(response.data.data); // Assuming response.data contains the data array
      setIsLoading(false)

    } catch (error) {
      console.error('Failed to fetch patient:', error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleEdit = (patient = {}) => {
    let start_date = formatDateYYMMDD(patient?.start_date)
    let end_date = formatDateYYMMDD(patient?.end_date)
    let pain = patient?.pain?.split(",")

    patient["start_date"] = start_date
    patient["end_date"] = end_date
    patient.pain = pain

    setCurrentPatient(patient);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    try {
      setConfirmation(true)
      setDeleteID(id)
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentPatient({});
    setIsEditing(false);
  };

  const handleDialogSave = async () => {

    if ((!currentPatient?.start_date || !currentPatient?.end_date || new Date(currentPatient?.start_date) >= new Date(currentPatient?.end_date))) {
      toast.error("please select valid dates")
      // alert("please select valid dates")
      return
    }
    console.log(currentPatient?.pain)
    if (!(currentPatient?.name?.trim()) || !(currentPatient?.city?.trim()) ||
      !(currentPatient?.country?.trim()) ||
      !(currentPatient?.pain?.join()?.length) || !(currentPatient?.package) ||
      !(currentPatient?.url?.trim()) || (currentPatient?.mobile?.trim().length != 10)) {
      toast.error("please provide all Details")
      // alert("please provide all Details")
      return
    }

    let pain = currentPatient?.pain.join(",")
    currentPatient.pain = pain


    if (isEditing) {
      try {

        let data = await callAxiosApi(updateData, { ...currentPatient, table: PATIENT });
        setisDataUpdated(!isDataUpdated)
        console.log("response", data)
        toast.success("Patient Updated Successfully")

      } catch (error) {
        console.error('Failed to update patient:', error);
        toast.error("Failed to update patient")

      }
    } else {
      const localData = getLocalItem("data")
      console.log("Patient", currentPatient)
      const response = await callAxiosApi(insertPatient, { ...currentPatient, type_id: localData?.type_id, created_by: localData?.id })
      setisDataUpdated(!isDataUpdated)
      console.log(">>>>>>>", response)
      toast.success("New Patient Added Successfully")

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

  const handleConfirmation = async (data) => {
    console.log(">>>>>", data)
    // setIsLoading(true)
    if (data) {
      let response = await callAxiosApi(deleteData, { table: PATIENT, id: deleteID })
      setisDataUpdated(!isDataUpdated)
      console.log("response", response)
    }
    setConfirmation(false)
    // setIsLoading(false)
  }

  const handlePainChange = (event) => {
    const { target: { value } } = event;
    console.log(value)
    setCurrentPatient({
      ...currentPatient,
      pain: value,
    });
  };
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth="xl">
      <ToastContainer position='top-right' />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Patients</Typography>
        {isMaster && <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddNewUser}>
          New Patient
        </Button>}
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress />
              </Box>
            ) : <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={patient.length}
                headLabel={[
                  { id: 'sr', label: 'Sr.' },

                  { id: 'name', label: 'Name' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'city', label: 'City/Country' },
                  { id: 'pain', label: 'Pain' },
                  { id: 'url', label: 'URL' },
                  { id: 'start_date', label: 'Start Date' },
                  { id: 'end_date', label: 'End Date' },
                  { id: 'package', label: 'Package' },
                  // { id: 'created_by', label: 'Created By' },
                  { id: 'type_id', label: 'Client Of' },
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
                onRequestSort={handleSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <PatientTableRow sr={index + 1} isAdmin={isMaster} row={row} handleEdit={() => handleEdit({ ...row })} handleDelete={handleDelete}
                    />
                  ))}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, patient.length)}
                /> */}

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>}
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={patient.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 20, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {openDialog && <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
        <DialogContent>
          <Grid xs={12} container spacing={2} >
            <Grid xs={12} item sm={6} >
              <TextField
                margin="dense"
                name="name"
                required
                label="Name"
                type="text"
                fullWidth
                value={currentPatient?.name || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} item sm={6}>
              <TextField
                margin="dense"
                name="mobile"
                label="Mobile"
                type="number"
                fullWidth
                value={currentPatient?.mobile || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} item sm={6}>
              <TextField
                margin="dense"
                name="city"
                label="City/State"
                type="text"
                fullWidth
                value={currentPatient?.city || ''}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={12} item sm={6}>
              <TextField
                margin="dense"
                name="country"
                label="Country"
                type="text"
                fullWidth
                value={currentPatient?.country || ''}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={12} item sm={12}>

              {/* <TextField
            margin="dense"
            name="pain"
            label="Pain"
            type="text"
            fullWidth
            value={currentPatient?.pain || ''}
            onChange={handleInputChange}
          /> */}

              <FormControl fullWidth margin="dense">
                <InputLabel>Pain</InputLabel>
                <Select
                  multiple
                  value={currentPatient?.pain || []}
                  onChange={handlePainChange}
                  input={<OutlinedInput label="Pain" />}
                  renderValue={(selected) => {
                    return selected?.join(",")
                  }} // selected.join thi error ave
                >
                  {painOptions.map((pain) => (
                    <MenuItem key={pain} value={pain}>
                      <Checkbox checked={currentPatient?.pain?.includes(pain) || ''} />
                      <ListItemText primary={pain} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Grid>
            <Grid xs={12} item sm={6}>
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
            </Grid>

            <Grid xs={12} item sm={6}>
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
            </Grid>
            <Grid xs={12} item sm={12}>
              {/* <TextField
            margin="dense"
            name="package"
            label="Package"
            // type="text"
            fullWidth
            value={currentPatient?.package || ''}
            onChange={handleInputChange}
          /> */}

              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Select Package</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='package'
                  value={currentPatient?.package}
                  onChange={handleInputChange}
                  label="Select Package"
                >
                  <MenuItem value={1}>FITNAT Coaching Premium</MenuItem>
                  <MenuItem value={2}>FITNAT Coaching Delux</MenuItem>
                  <MenuItem value={3}>FITNAT Coaching Personal Training</MenuItem>
                </Select>
              </FormControl>
              {/* Add other fields as needed */}
            </Grid>

            <Grid xs={12} item sm={12}>
              <TextField
                margin="dense"
                name="url"
                label="URL"
                type="text"
                fullWidth
                value={currentPatient?.url || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave}>{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>}
      <ConfirmationDialog openDialog={confirmation} message={"Are You Sure"} handleSave={handleConfirmation} />

    </Container>
  );
}
