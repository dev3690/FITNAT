
// Old ex1

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
import { getData, PATIENT, USER, callAxiosApi, insertPatient, updateData, deleteData } from 'src/utils/api_utils';
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
  const [teammates, setTeammates] = useState([]); // New state for teammates

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
    fetchTeammates(); // Load teammates when component mounts

    let role = getLocalItem("data")?.isMaster
    setIsMaster(role)
  }, [isDataUpdated]);



  // const fetchTeammates = async () => {
  //   // Fetch the teammates from an API or use a static list
  //   const response = await callAxiosApi(getData, { table: USER });
  //   // setTeammates(response.data.data);
  //       setTeammates("User data -->",response.data.data || []); // Ensure it's an array

  //   console.log("User data -->",response.data.data)
  // };
  const fetchTeammates = async () => {
    try {
      const response = await callAxiosApi(getData, { table: USER });
      // Ensure the data is an array
      setTeammates(Array.isArray(response.data.data) ? response.data.data : []);
      console.log("User-masters data:", response.data.data); // Print user-masters data to console
    } catch (error) {
      console.error('Failed to fetch teammates:', error);
    }
  };


  const handleAssignChange = (patientId, teammateId) => {
    setPatient((prevPatients) =>
      prevPatients.map((p) =>
        p.id === patientId ? { ...p, assign_to: teammateId } : p
      )
    );
    // Optionally, update the backend immediately or wait for dialog save
  };



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

  // const handleEdit = (patient = {}) => {
  //   let startDate = formatDateYYMMDD(patient?.start_date);
  //   let endDate = formatDateYYMMDD(patient?.end_date);

  //   // Validate dates
  //   if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
  //     toast.error("Please select valid dates");
  //     return;
  //   }

  //   // Check if date range exceeds 90 days (12 weeks)
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const timeDiff = end.getTime() - start.getTime();
  //   const daysDiff = timeDiff / (1000 * 3600 * 24);

  //   if (daysDiff > 90) {
  //     toast.error("Date range should not exceed 90 days");
  //     return;
  //   }

  //   // Update the patient object with the validated dates
  //   patient["start_date"] = startDate;
  //   patient["end_date"] = endDate;
  //   patient.pain = patient?.pain?.split(",");

  //   setCurrentPatient(patient);
  //   setIsEditing(true);
  //   setOpenDialog(true);
  // };





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

    // if ((!currentPatient?.start_date || !currentPatient?.end_date || new Date(currentPatient?.start_date) >= new Date(currentPatient?.end_date))) {
    //   toast.error("please select valid dates")
    //   // alert("please select valid dates")
    //   return
    // }
    const twelveWeeksInMilliseconds = 12 * 7 * 24 * 60 * 60 * 1000; // 12 weeks in milliseconds

if (
  !currentPatient?.start_date ||
  !currentPatient?.end_date ||
  new Date(currentPatient?.start_date) >= new Date(currentPatient?.end_date) ||
  (new Date(currentPatient?.end_date) - new Date(currentPatient?.start_date)) > twelveWeeksInMilliseconds
) {
  toast.error("Please select valid dates and period should extend more than 12 weeks");
  // alert("please select valid dates");
  return;
}

    console.log(currentPatient?.pain)
    if (!(currentPatient?.name?.trim()) || !(currentPatient?.city?.trim()) ||
      !(currentPatient?.country?.trim()) ||
      !(currentPatient?.pain?.join()?.length) || !(currentPatient?.package) ||
      !(currentPatient?.url?.trim()) ) {
      toast.error("please provide all Details")
      // alert("please provide all Details")
      return
    }
    // if ((currentPatient?.mobile?.trim().length != 10)) {
    //   toast.error("please provide 10 digit mobile number! ")
    //   // alert("please provide all Details")
    //   return
    // }

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



  const handleAssignToChange = (event) => {
    const { value } = event.target;
    setCurrentPatient({
      ...currentPatient,
      assign_to: value,
    });
  };

  // const getTeammateName = (id) => {
  //   const teammate = Array.isArray(teammates) ? teammates.find((t) => t.id === id) : null;
  //   return teammate ? teammate.name : '';
  // };
  const getTeammateName = (id) => {
    const teammate = Array.isArray(teammates) ? teammates.find((t) => t.id === id) : null;
    return teammate ? teammate.name : '';
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




  // const applyFilter = ({ inputData, comparator, filterName }) => {
  //   const stabilizedThis = inputData.map((el, index) => [el, index]);

  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });

  //   if (filterName) {
  //     inputData = inputData.filter((item) => {
  //       const teammateName = getTeammateName(item.assign_to).toLowerCase(); // Fetch the teammate's name
  //       return (
  //         item.name.toLowerCase().includes(filterName.toLowerCase()) || // Filter by patient's name
  //         teammateName.includes(filterName.toLowerCase()) // Filter by teammate's name
  //       );
  //     });
  //   }

  //   return stabilizedThis.map((el) => el[0]);
  // };




  const dataFiltered = applyFilter({
    inputData: patient,
    comparator: getComparator(order, orderBy),
    filterName,
    getTeammateName,  // Pass the getTeammateName function

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

// Add new state for reset confirmation
const [resetConfirmation, setResetConfirmation] = useState(false);

// Modify the reset handler
const handleReset = () => {
  setResetConfirmation(true);
};

// Add handler for reset confirmation
const handleResetConfirmation = (confirmed) => {
  if (confirmed) {
    // Create a copy of current patient with all week statuses reset
    const resetPatient = {
      ...currentPatient,
      currentWeek: 1,
      isNotify: false,
      status: { // Reset status object
      // Reset all week statuses
      week1u1: 0, week1u2: 0, week1u3: 0,
      week2u1: 0, week2u2: 0, week2u3: 0,
      week3u1: 0, week3u2: 0, week3u3: 0,
      week4u1: 0, week4u2: 0, week4u3: 0,
      week5u1: 0, week5u2: 0, week5u3: 0,
      week6u1: 0, week6u2: 0, week6u3: 0,
      week7u1: 0, week7u2: 0, week7u3: 0,
      week8u1: 0, week8u2: 0, week8u3: 0,
      week9u1: 0, week9u2: 0, week9u3: 0,
      week10u1: 0, week10u2: 0, week10u3: 0,
      week11u1: 0, week11u2: 0, week11u3: 0,
      week12u1: 0, week12u2: 0, week12u3: 0,
      // Keep other essential fields
      assign_to: currentPatient.assign_to,
      assignee: currentPatient.assignee,
      creator: currentPatient.creator,
      totalWeeks: currentPatient.totalWeeks
    }};
    console.log("Reset Patient", resetPatient)
    setCurrentPatient(resetPatient);
  }
  setResetConfirmation(false);
};



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
        <Typography variant="h4"></Typography>
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
                  { id: 'assign_to', label: 'Assigned To' }, // New column
                  // { id: 'created_by', label: 'Created By' },
                  { id: 'type_id', label: 'Client Of' },
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
                onRequestSort={handleSort}
              />
              <TableBody>
                {/* {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <PatientTableRow sr={index + 1} isAdmin={isMaster} row={row} handleEdit={() => handleEdit({ ...row })} handleDelete={handleDelete}
                    />
                  ))} */}
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <PatientTableRow
                      key={row.id}
                      sr={index + 1}
                      isAdmin={isMaster}
                      row={row}
                      handleEdit={() => handleEdit({ ...row })}
                      handleDelete={handleDelete}
                      teammates={getTeammateName(row.assign_to)}
                      handleAssignChange={handleAssignChange}
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


            {/* <Grid xs={12} item sm={12}>
              <TextField
                margin="dense"
                name="assign_to"
                label="Assign To"
                type="text"
                fullWidth
                value={currentPatient?.assign_to || ''}
                onChange={handleInputChange}
              />
            </Grid> */}


            <Grid item xs={12} sm={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Assign To</InputLabel>
                <Select
                  value={currentPatient?.assign_to || ''}
                  onChange={handleAssignToChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {teammates.map((teammate) => (
                    <MenuItem key={teammate.id} value={teammate.id}>
                      {teammate.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleReset}
            color="warning"
          >
            Reset
          </Button>
          <Button onClick={handleDialogSave}>{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>}
      <ConfirmationDialog openDialog={confirmation} message={"Are You Sure"} handleSave={handleConfirmation} />
      <ConfirmationDialog openDialog={confirmation} message={"Are You Sure"} handleSave={handleConfirmation} />
      <ConfirmationDialog openDialog={resetConfirmation} message={"Are you sure you want to reset the form?"} handleSave={handleResetConfirmation} />
    </Container>
  );
}

