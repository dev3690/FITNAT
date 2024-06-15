


import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  Avatar,
  Popover,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  Typography,
  IconButton,
  Button,
} from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { STATUS, callAxiosApi, updateData } from 'src/utils/api_utils';

// ----------------------------------------------------------------------

export default function BirdEyeTableRow({
  selected,
  name,
  id,
  pack,
  pain,
  url,
  currentWeek,
  totalWeeks,
  status,
  index,
  start_date,
  end_date,
  handleClick,
  upliftState,
  handleEdit,
  handleDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  }

  const onstatusChanged = async (data) => {
    console.log("data to update",data)
    let response = await callAxiosApi(updateData, data)
    upliftState()
    console.log("<><><><><><>", response)
  }


  return (
    <>
      <TableRow hover tabIndex={-1}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        {/* <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell> */}

        <TableCell>{name}</TableCell>
        <TableCell>{pack}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            href={url}
            size="small"
            color={'success'}
          // onClick={() => handleTasks(user.id, week)}
          // style={{ minWidth: '40px', padding: '4px 8px' }}
          // disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
          >
            link
          </Button>

        </TableCell>
        <TableCell align="center">{new Date(start_date).toLocaleString().split(",")[0]}</TableCell>
        <TableCell align="center">{new Date(end_date).toLocaleString().split(",")[0]}</TableCell>
        {Array.from({ length: 12 }, (_, i) => i).map((item) => (
          <TableCell id={'index' + item} align="center" sx={{ backgroundColor: item + 1 == currentWeek && "#e4eaec", borderRadius: item + 1 == currentWeek && "20px 0px 20px 0px" }} >
            <Button
              variant="contained"
              size="small"
              color={status[`week${item + 1}u1`] == 1 ? 'success' : "error"}
              disabled={item + 1 > totalWeeks}
              onClick={() => onstatusChanged({ id: id ,table:STATUS,[`week${item + 1}u1`]:status[`week${item + 1}u1`] == 1 ? 0 : 1})}
            // style={{ minWidth: '40px', padding: '4px 8px' }}
            // disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
            >
              UPD
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ margin: "10px" }}
              color={status[`week${item + 1}u2`] == 1 ? 'success' : "error"}
              disabled={item + 1 > totalWeeks}
              onClick={() => onstatusChanged({ id: id ,table:STATUS,[`week${item + 1}u2`]:status[`week${item + 1}u2`] == 1 ? 0 : 1})}
            // style={{ minWidth: '40px', padding: '4px 8px' }}
            // disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
            >
              TKS
            </Button>
          </TableCell>
        )
        )
        }
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
