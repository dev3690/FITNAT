import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  Card,
  Grid,
  Table,
  Button,
  Dialog,
  Container,
  TableBody,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { USER, insertData, birdViewApi, callAxiosApi } from 'src/utils/api_utils';
import { useNavigate } from 'react-router-dom';
import { getLocalItem } from 'src/utils/local_operations';

import BirdEyeTableRow from './bird-eye-table-row';
import TableNoData from '../sections/user/table-no-data';
import UserTableHead from '../sections/user/user-table-head';
import TableEmptyRows from '../sections/user/table-empty-rows';
import UserTableToolbar from '../sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../sections/user/utils';
import { calcTimeline } from 'src/utils/date_time';
// import UserTableRow from './user-table-row';

// ----------------------------------------------------------------------

export default function BirdEyeView() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDataUpdated, setisDataUpdated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(true); // Set to true to show initially



  let optionList = [
    { id: 1, label: "Name" },
    { id: 2, label: "Package" },
    { id: 3, label: "Link" },
    { id: 4, label: "Start Date" },
    { id: 5, label: "End Date" },
    { id: 6, label: "Pain" },
    ...Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((item, index) => (({ id: `${item}-${index}`, label: item })))
  ]
  const [selectedColumns, setSelectedColumns] = useState(optionList?.map((item) => item?.label));

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        let localData = getLocalItem("data")

        const response = await callAxiosApi(birdViewApi)

        console.log("RESP BIRD EYE",response)
        const data = response?.data?.filter((item) => item?.patient_master?.user_master?.type_id == localData?.type_id)?.map((item) => ({
          ...item?.patient_master,
          id: item?.id,
          totalWeeks: calcTimeline(item?.patient_master)?.totalWeeks,
          currentWeek : item?.currentWeek,
          isNotify : item?.isNotify,          
          status: filterWeekKeys(item)
          // .filter(key => key.startsWith('week'))
        }))
        console.log("RESP>>>>>", data)
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const filterWeekKeys = (obj) => Object.keys(obj)
      .filter(key => key.startsWith('week'))
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});

    // {
    //   table:"statusUpdate",
    //   id:"row_id"
    // }



    fetchUsers();
  }, [isDataUpdated]);
  //   {
  //     "id": 1,
  //     "name": "Deep",
  //     "mobile": "6353783314",
  //     "username": "deep",
  //     "password": "123",
  //     "isMaster": true,
  //     "type_id": 1,
  //     "createdAt": "2024-06-15T12:16:19.000Z",
  //     "updatedAt": "2024-06-15T12:16:19.000Z"
  // }

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenDialog(true);
  };
  const toggleFilterButton = () => {
    setShowFilterButton(!showFilterButton);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3690/user_masters/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    // setCurrentUser({});
    setIsEditing(false);
  };

  const handleDialogSave = async () => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:3690/user_masters/${currentUser.id}`, currentUser);
        setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    } else {
      try {
        //     setCurrentUser({ name: '', mobile: '', username: '', password: '', isMaster: false, type_id: '' });
        if (!(currentUser?.name) || !(currentUser?.mobile) || !(currentUser?.username) || !(currentUser?.password) || !(currentUser?.type_id)) {
          alert("All fields are required")
          return
        }
        // const data = currentUser

        const response = await callAxiosApi(insertData, { ...currentUser, table: USER })
        console.log("insert RESP", response)
        setisDataUpdated(!isDataUpdated)

        // const response = await axios.post('http://localhost:3690/user_masters', currentUser);
        // setUsers([...users, { ...currentUser, id: response.data.id, createdAt: response.data.createdAt, updatedAt: response.data.updatedAt }]);
      } catch (error) {
        console.error('Failed to add user:', error);
      }
    }
    handleDialogClose();
  };

  const upliftState = () => {
    setisDataUpdated(!isDataUpdated)
  }

  const handleAddNewUser = () => {
    setCurrentUser({ name: '', mobile: '', username: '', password: '', isMaster: false, type_id: '' });
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
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleExit = () => {
    // window.close();

    navigate('/patients');
  };
  const navigate = useNavigate();

  const handleSelectedColumns = (selected) => {
    console.log(">>>>>>>>", selected)
    setSelectedColumns(selected)
  }


  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container sx={{ display: "flex" }}>

      <Grid xs={12} md={2} margin={5}>

        <div >
          <Button onClick={handleExit} variant='contained' color='primary'>Exit</Button>
        </div>
        <Card sx={{ marginTop: "10px" }}>
          <UserTableToolbar
            numSelected={0}
            filterName={filterName}
            handleSelectedColumns={handleSelectedColumns}
            onFilterName={handleFilterByName}
            showFilterButton={showFilterButton}
          />

          {/* <Scrollbar> */}
          <TableContainer sx={{ overflow: 'auto' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                // order={order}
                // orderBy={orderBy}
                // rowCount={users.length}
                headLabel={
                  optionList?.filter((item) => selectedColumns.includes(item?.label))
                } />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <BirdEyeTableRow
                      selectedColumns={selectedColumns}
                      id={row.id}
                      index={index}
                      currentWeek={row?.currentWeek}
                      isNotify={row?.isNotify} 
                      totalWeeks={row?.totalWeeks}
                      selected={false}  // Modify based on your selection logic
                      name={row.name}
                      upliftState={upliftState}
                      status={row?.status}
                      pack={row.package} // Add this field to your data if needed
                      url={row.url} // Modify or remove based on your data structure
                      pain={row.pain} // Modify or remove based on your data structure
                      start_date={row.start_date} // Modify or remove based on your data structure
                      end_date={row.end_date} // Modify or remove based on your data structure
                      type_id={row.type_id}
                      handleEdit={() => handleEdit(row)}
                      handleDelete={() => handleDelete(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[15, 25, 50]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>




      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentUser?.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="mobile"
            label="Mobile"
            type="text"
            fullWidth
            value={currentUser?.mobile || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={currentUser?.username || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="text"
            fullWidth
            value={currentUser?.password || ''}
            onChange={handleInputChange}
          />
          <label>
            <input
              name="isMaster"
              type="checkbox"
              checked={currentUser?.isMaster || false}
              onChange={(e) => setCurrentUser({ ...currentUser, isMaster: e.target.checked })}
            />
            IsMaster
          </label>
          <TextField
            margin="dense"
            name="type_id"
            label="Type ID"
            type="number"
            fullWidth
            value={currentUser?.type_id || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave}>{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
