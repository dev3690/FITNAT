
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { getData, USER, birdViewApi, callAxiosApi } from 'src/utils/api_utils';
import { useNavigate } from 'react-router-dom';
import { getLocalItem } from 'src/utils/local_operations';

import BirdEyeTableRow from './bird-eye-table-row';
import TableNoData from '../sections/user/table-no-data';
import UserTableHead from '../sections/user/user-table-head';
import TableEmptyRows from '../sections/user/table-empty-rows';
import UserTableToolbar from '../sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../sections/user/utils';
import { calcTimeline } from 'src/utils/date_time';

export default function BirdEyeView() {
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState(new Map());
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('assign_to'); // Default sorting by 'Assign To'
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(true); // Set to true to show initially

  let optionList = [
    { id: 'name', label: 'Name' },
    { id: 'package', label: 'Package' },
    { id: 'link', label: 'Link' },
    { id: 'start_date', label: 'Start Date' },
    { id: 'end_date', label: 'End Date' },
    { id: 'pain', label: 'Pain' },
    { id: 'assign_to', label: 'Assign To' }, // New column
    ...Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((item, index) => ({ id: `${item}-${index}`, label: item })),
  ];

  const [selectedColumns, setSelectedColumns] = useState(optionList.map((item) => item.label));

  // Step 1: Get the Logged-In User's type_id
  const loggedInUser = getLocalItem('data');
  const loggedInUserTypeId = loggedInUser?.type_id;

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await callAxiosApi(birdViewApi);
        const usersResponse = await callAxiosApi(getData, { table: USER }); // Fetch user-masters data
        const usersData = usersResponse.data.data;

        const currentDate = new Date();

        const data = response?.data?.map((item) => ({
          ...item?.patient_master,
          id: item?.id,
          totalWeeks: calcTimeline(item?.patient_master)?.totalWeeks,
          currentWeek: item?.currentWeek,
          isNotify: item?.isNotify,
          status: filterWeekKeys(item),
          assign_to: item?.patient_master?.assign_to, // Ensure this field exists
          type_id: item?.patient_master?.type_id, // Ensure this field exists
        }))
        .filter((patient) => new Date(patient.end_date) >= currentDate); // Filter based on end_date

        // Create a map of user IDs to names
        const userMapping = new Map(usersData.map(user => [user.id, user.name]));
        setUserMap(userMapping);
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

    fetchUsers();
  }, [isDataUpdated, loggedInUserTypeId]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const upliftState = () => {
    setIsDataUpdated(!isDataUpdated);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
    filterBy: 'assign_to', // Change filter criteria to 'assign_to'
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const toggleFilterButton = () => {
    setShowFilterButton(!showFilterButton);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenDialog(true);
  };

  return (
    <Container sx={{ display: 'flex' }}>
      <Grid xs={12} md={2} margin={5}>
        <div>
          <Button onClick={() => navigate('/patients')} variant='contained' color='primary'>Exit</Button>
        </div>

        <Card sx={{ marginTop: '10px' }}>
          <UserTableToolbar
            numSelected={0}
            filterName={filterName}
            handleSelectedColumns={setSelectedColumns}
            onFilterName={handleFilterByName}
            showFilterButton={showFilterButton}
          />

          <TableContainer sx={{ overflow: 'auto' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                rowCount={users.length}
                headLabel={optionList.filter((item) => selectedColumns.includes(item.label))}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <BirdEyeTableRow
                      key={row.id}
                      selectedColumns={selectedColumns}
                      id={row.id}
                      index={index}
                      currentWeek={row?.currentWeek}
                      isNotify={row?.isNotify}
                      totalWeeks={row?.totalWeeks}
                      selected={false}
                      name={row.name}
                      upliftState={upliftState}
                      status={row?.status}
                      pack={row.package}
                      url={row.url}
                      pain={row.pain}
                      start_date={row.start_date}
                      end_date={row.end_date}
                      assign_to={userMap.get(row.assign_to)} // Display the name corresponding to assign_to ID
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
    </Container>
  );
}





// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import {
//   Card,
//   Grid,
//   Table,
//   Button,
//   Container,
//   TableBody,
//   TableContainer,
//   TablePagination,
// } from '@mui/material';

// import { getData, USER, birdViewApi, callAxiosApi } from 'src/utils/api_utils';
// import { useNavigate } from 'react-router-dom';
// import { getLocalItem } from 'src/utils/local_operations';

// import BirdEyeTableRow from './bird-eye-table-row';
// import TableNoData from '../sections/user/table-no-data';
// import UserTableHead from '../sections/user/user-table-head';
// import TableEmptyRows from '../sections/user/table-empty-rows';
// import UserTableToolbar from '../sections/user/user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../sections/user/utils';
// import { calcTimeline } from 'src/utils/date_time';

// export default function BirdEyeView() {
//   const [users, setUsers] = useState([]);
//   const [userMap, setUserMap] = useState(new Map());
//   const [page, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('assign_to'); // Default sorting by 'Assign To'
//   const [filterName, setFilterName] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(15);
//   const [isDataUpdated, setIsDataUpdated] = useState(false);
//   const [showFilterButton, setShowFilterButton] = useState(true); // Set to true to show initially

//   let optionList = [
//     { id: 'name', label: 'Name' },
//     { id: 'package', label: 'Package' },
//     { id: 'link', label: 'Link' },
//     { id: 'start_date', label: 'Start Date' },
//     { id: 'end_date', label: 'End Date' },
//     { id: 'pain', label: 'Pain' },
//     { id: 'assign_to', label: 'Assign To' }, // New column
//     ...Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((item, index) => ({ id: `${item}-${index}`, label: item })),
//   ];

//   const [selectedColumns, setSelectedColumns] = useState(optionList.map((item) => item.label));

//   // Step 1: Get the Logged-In User's type_id
//   const loggedInUser = getLocalItem('data').name;
//   const loggedInUserTypeId = loggedInUser?.type_id;
// console.log("loggedInUser",loggedInUser);
//   useEffect(() => {
//     // Fetch users from API
//     const fetchUsers = async () => {
//       try {
//         const response = await callAxiosApi(birdViewApi);
//         const usersResponse = await callAxiosApi(getData, { table: USER }); // Fetch user-masters data
//         const usersData = usersResponse.data.data;

//         const currentDate = new Date();

//         const data = response?.data
//           ?.map((item) => ({
//             ...item?.patient_master,
//             id: item?.id,
//             totalWeeks: calcTimeline(item?.patient_master)?.totalWeeks,
//             currentWeek: item?.currentWeek,
//             isNotify: item?.isNotify,
//             status: filterWeekKeys(item),
//             assign_to: item?.patient_master?.assign_to, // Ensure this field exists
//             type_id: item?.patient_master?.type_id, // Ensure this field exists
//           }))
//           // console.log("Log")
//           .filter((data) => 
//             new Date(data.end_date) >= currentDate &&
//             data.type_id === loggedInUserTypeId ,// Filter based on type_id
//           );
          
//           // Create a map of user IDs to names
//           const userMapping = new Map(usersData.map(user => [user.id, user.name]));
//           setUserMap(userMapping);
//           setUsers(data);
//           console.log(data);
//           // console.log("data.creator.type_id",data.creator.type_id)
//         // console.log("Filtered Data",);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     const filterWeekKeys = (obj) => Object.keys(obj)
//       .filter(key => key.startsWith('week'))
//       .reduce((acc, key) => {
//         acc[key] = obj[key];
//         return acc;
//       }, {});

//     fetchUsers();
//   }, [isDataUpdated, loggedInUserTypeId]);

//   const handleSort = (event, id) => {
//     const isAsc = orderBy === id && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(id);
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const upliftState = () => {
//     setIsDataUpdated(!isDataUpdated);
//   };

//   const dataFiltered = applyFilter({
//     inputData: users,
//     comparator: getComparator(order, orderBy),
//     filterName,
//     filterBy: 'assign_to', // Change filter criteria to 'assign_to'
//   });

//   const notFound = !dataFiltered.length && !!filterName;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const toggleFilterButton = () => {
//     setShowFilterButton(!showFilterButton);
//   };

//   const handleEdit = (user) => {
//     setCurrentUser(user);
//     setIsEditing(true);
//     setOpenDialog(true);
//   };

//   return (
//     <Container sx={{ display: 'flex' }}>
//       <Grid xs={12} md={2} margin={5}>
//         <div>
//           <Button onClick={() => navigate('/patients')} variant='contained' color='primary'>Exit</Button>
//         </div>

//         <Card sx={{ marginTop: '10px' }}>
//           <UserTableToolbar
//             numSelected={0}
//             filterName={filterName}
//             handleSelectedColumns={setSelectedColumns}
//             onFilterName={handleFilterByName}
//             showFilterButton={showFilterButton}
//           />

//           <TableContainer sx={{ overflow: 'auto' }}>
//             <Table sx={{ minWidth: 800 }}>
//               <UserTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 onRequestSort={handleSort}
//                 rowCount={users.length}
//                 headLabel={optionList.filter((item) => selectedColumns.includes(item.label))}
//               />
//               <TableBody>
//                 {dataFiltered
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row, index) => (
//                     <BirdEyeTableRow
//                       key={row.id}
//                       selectedColumns={selectedColumns}
//                       id={row.id}
//                       index={index}
//                       currentWeek={row?.currentWeek}
//                       isNotify={row?.isNotify}
//                       totalWeeks={row?.totalWeeks}
//                       selected={false}
//                       name={row.name}
//                       upliftState={upliftState}
//                       status={row?.status}
//                       pack={row.package}
//                       url={row.url}
//                       pain={row.pain}
//                       start_date={row.start_date}
//                       end_date={row.end_date}
//                       assign_to={userMap.get(row.assign_to)} // Display the name corresponding to assign_to ID
//                       handleEdit={() => handleEdit(row)}
//                       handleDelete={() => handleDelete(row.id)}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={77}
//                   emptyRows={emptyRows(page, rowsPerPage, users.length)}
//                 />

//                 {notFound && <TableNoData query={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             page={page}
//             component="div"
//             count={users.length}
//             rowsPerPage={rowsPerPage}
//             onPageChange={handleChangePage}
//             rowsPerPageOptions={[15, 25, 50]}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Card>
//       </Grid>
//     </Container>
//   );
// }
