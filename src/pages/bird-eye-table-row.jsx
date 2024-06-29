


import { useState, useEffect } from 'react';

import {
  Button,
  TableRow,
  TableCell,
} from '@mui/material';

import { STATUS, updateData, callAxiosApi } from 'src/utils/api_utils';
import { getLocalItem } from 'src/utils/local_operations';


// ----------------------------------------------------------------------

export default function BirdEyeTableRow({
  selected,
  name,
  currentWeek,
  isNotify,
  id,
  pack,
  pain,
  row,
  selectedColumns,
  url,
  // currentWeek,
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
  const [typeId, setTypeId] = useState();




  useEffect(() => {
    // fetchUsers();
    let role = getLocalItem("data")?.type_id
    setTypeId(role)
  },
    // [isDataUpdated]
  );


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  }

  const onstatusChanged = async (data) => {
    console.log("data to update", data)
    const response = await callAxiosApi(updateData, data)
    upliftState()
    console.log("<><><><><><>", response)
  }

  return (
    <TableRow hover tabIndex={-1} >
      {selectedColumns?.includes("Name") && <TableCell>{name}</TableCell>}
      {selectedColumns?.includes("Package") && <TableCell>{pack == 1 ? "Fitnat Coaching Premium" : pack == 2 ? "Fitnat Coaching Delux" : "Fitnat Personal Training"}</TableCell>}
      {selectedColumns?.includes("Link") && <TableCell align="center">
        <Button
          variant="outlined"
          href={url}
          size="small"
          color="success"
        // onClick={() => handleTasks(user.id, week)}
        // style={{ minWidth: '40px', padding: '4px 8px' }}
        // disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
        >
          link
        </Button>

      </TableCell>}
      {selectedColumns?.includes("Start Date") && <TableCell align="center">{new Date(start_date).toLocaleString().split(",")[0]}</TableCell>}
      {selectedColumns?.includes("End Date") && <TableCell align="center">{new Date(end_date).toLocaleString().split(",")[0]}</TableCell>}
      {selectedColumns?.includes("Pain") && <TableCell>{pain}</TableCell>}
        
      {Array.from({ length: 12 }, (_, i) => i).map((item) => (
        selectedColumns.includes(`Week ${item + 1}`) && <TableCell id={`index${item}`} align="center" sx={{ backgroundColor: isNotify && item + 1 == currentWeek ? "#76bfff" : (item + 1 == currentWeek && "#e4eaec"), borderRadius: item + 1 == currentWeek && "20px 0px 20px 0px" }} >

          <Button
            variant="contained"
            size="small"
            color={status[`week${item + 1}u1`] == 1 ? 'success' : (status[`week${item + 1}u1`] == 0 && item + 1 < currentWeek) ? "info" : "error"}
            disabled={item + 1 > totalWeeks}
            onClick={() => onstatusChanged({ id, table: STATUS, [`week${item + 1}u1`]: status[`week${item + 1}u1`] == 1 ? 0 : 1 })}
          // style={{ minWidth: '40px', padding: '4px 8px' }}
          // disabled={i >= packageDetails[user.details.find(detail => detail.label === 'Package').value]}
          >
            {(typeId == 1) ? "UPD" : "UPD1"}
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{ margin: "10px" }}
            color={status[`week${item + 1}u2`] == 1 ? 'success' : (status[`week${item + 1}u2`] == 0 && item + 1 < currentWeek) ? "info" : "error"}
            disabled={item + 1 > totalWeeks}
            onClick={() => onstatusChanged({ id, table: STATUS, [`week${item + 1}u2`]: status[`week${item + 1}u2`] == 1 ? 0 : 1 })}>
            {(typeId == 1) ? "TKS" : "UPD2"}
          </Button>

          {(typeId == 2) && <Button
            variant="contained"
            size="small"
            sx={{ margin: "10px" }}
            color={status[`week${item + 1}u3`] == 1 ? 'success' : (status[`week${item + 1}u3`] == 0 && item + 1 < currentWeek) ? "info" : "error"}
            disabled={item + 1 > totalWeeks}
            onClick={() => onstatusChanged({ id, table: STATUS, [`week${item + 1}u3`]: status[`week${item + 1}u3`] == 1 ? 0 : 1 })}>
            UPD3
          </Button>}
        </TableCell>
      ))
      }
    </TableRow>
  );
}
