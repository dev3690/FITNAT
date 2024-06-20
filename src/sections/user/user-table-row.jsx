


import { useState } from 'react';

import {
  Stack,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableCell,
  Typography,
  Box
} from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  id,
  avatarUrl,
  sr,
  mobile,
  username,
  password,
  isAdmin,
  isMaster,
  type_id,
  handleClick,
  handleEdit,
  handleDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow>
        <TableCell align='center' padding="checkbox">
          {sr}
        </TableCell>

        <TableCell align='center'>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{mobile}</TableCell>

        <TableCell>{username}</TableCell>

        <TableCell align="center">{isAdmin ? password : "--"}</TableCell>

        <TableCell>
          <Label color={(isMaster) ? 'success' : "primary"}>{isMaster ? "ADMIN" : "USER"}</Label>
        </TableCell>
        <TableCell>
          <Label color={(type_id == 1) ? 'success' : "primary"}>{type_id == 1 ? "ADMIN1" : "ADMIN2"}</Label>
        </TableCell>

        <TableCell align="right">
          {/* <Button variant='contained' disabled={!isAdmin} size='small' color='primary' onClick={handleEdit} sx={{ marginRight: 1 }}>Edit</Button>
          <Button variant='contained' disabled={!isAdmin} size='small' onClick={() => handleDelete(id)} color='error'>Delete</Button> */}
          <Box display="flex" justifyContent="flex-end">
            <Button variant='contained' disabled={!isAdmin} size='small' onClick={handleEdit} color='primary' sx={{marginRight:1}}>Edit</Button>
            <Button variant='contained' disabled={!isAdmin} size='small' color='error' onClick={()=>handleDelete(row.id)}>Delete</Button>
        </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

// UserTableRow.propTypes = {
//   selected: PropTypes.bool,
//   name: PropTypes.string,
//   avatarUrl: PropTypes.string,
//   mobile: PropTypes.string,
//   username: PropTypes.string,
//   isVerified: PropTypes.bool,
//   status: PropTypes.string,
//   handleClick: PropTypes.func,
//   handleEdit: PropTypes.func,
//   handleDelete: PropTypes.func,
// };
