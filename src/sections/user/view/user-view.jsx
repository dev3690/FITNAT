import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Stack,
  Table,
  Button,
  Dialog,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import UserTableRow from 'src/sections/user/user-table-row';
import TableNoData from '../table-no-data';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { USER, callAxiosApi, getData, insertData } from 'src/utils/api_utils';
// import UserTableRow from './user-table-row';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDataUpdated, setisDataUpdated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await callAxiosApi(getData,{table:USER})
        console.log("RESP>>>>>",response)
        setUsers(response?.data?.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

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
        if(!(currentUser?.name) ||!(currentUser?.mobile) ||!(currentUser?.username) || !(currentUser?.password) || !(currentUser?.type_id)){
          alert("All fields are required")
          return 
        }
        let data = currentUser

        let response = await callAxiosApi(insertData,{...currentUser,table:USER})
        console.log("insert RESP",response)
        setisDataUpdated(!isDataUpdated)

        // const response = await axios.post('http://localhost:3690/user_masters', currentUser);
        // setUsers([...users, { ...currentUser, id: response.data.id, createdAt: response.data.createdAt, updatedAt: response.data.updatedAt }]);
      } catch (error) {
        console.error('Failed to add user:', error);
      }
    }
    handleDialogClose();
  };

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

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

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
                rowCount={users.length}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'username', label: 'Username' },
                  { id: 'password', label: 'Password' },
                  { id: 'isMaster', label: 'Is Master' },
                  { id: 'type_id', label: 'Type ID' },
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
                onRequestSort={handleSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      selected={false}  // Modify based on your selection logic
                      name={row.name}
                      mobile={row.mobile} // Add this field to your data if needed
                      company={row.company} // Modify or remove based on your data structure
                      username={row.username} // Modify or remove based on your data structure
                      password={row.password} // Modify or remove based on your data structure
                      isMaster={row.isMaster} // Modify or remove based on your data structure
                      type_id={row.type_id}
                      handleClick={() => {}} // Implement if needed
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
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
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
