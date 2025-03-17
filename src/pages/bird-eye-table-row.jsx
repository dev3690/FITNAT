



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
  assign_to,
  isActive
}) {
  const [open, setOpen] = useState(null);
  const [typeId, setTypeId] = useState();
  const [client_package, setClient_Package] = useState();




  useEffect(() => {
    // fetchUsers(); 
    let role = getLocalItem("data")?.type_id
    setTypeId(role)
    let package_data = getLocalItem("data")?.package
    setClient_Package(package_data)
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
    <TableRow hover tabIndex={-1} sx={{
      backgroundColor: !isActive ? '#ff8282' : 'inherit', // Grey background for inactive patients
      '&:hover': {
        backgroundColor: !isActive ? '#eeeeee' : '#ff8282',
      },
    }}>
      {selectedColumns?.includes("Name") && <TableCell>{name}</TableCell>}
      {selectedColumns?.includes("Package") && <TableCell>{pack == 1 ? "Fitnat Coaching Premium" : pack == 2 ? "Fitnat Coaching Delux" : "Fitnat Personal Training"}</TableCell>}
      {selectedColumns?.includes("Link") && <TableCell align="center">
        <Button
          variant="outlined"
          href={!url.startsWith('https://') ? 'https://' + url : url}
          size="small"
          color="success"
        >
          link
        </Button>
      </TableCell>}
      {selectedColumns?.includes("Start Date") && <TableCell align="center">{new Date(start_date).toLocaleString().split(",")[0]}</TableCell>}
      {selectedColumns?.includes("End Date") && <TableCell align="center">{new Date(end_date).toLocaleString().split(",")[0]}</TableCell>}
      {selectedColumns?.includes("Pain") && <TableCell>{pain}</TableCell>}
      {selectedColumns?.includes("Assign To") && <TableCell>{assign_to}</TableCell>}
        
      {Array.from({ length: 12 }, (_, i) => i).map((item) => (
        selectedColumns.includes(`Week ${item + 1}`) && (
          <TableCell
            id={`index${item}`}
            align="center"
            sx={{

              backgroundColor: isNotify && item + 1 === currentWeek ? "#76bfff" : (item + 1 === currentWeek && "#e4eaec"),

              borderRadius: item + 1 === currentWeek && "20px 0px 20px 0px",
              padding: 1,
            }}
          >
            <Button
              variant="contained"
              size="small"
              color={status[`week${item + 1}u1`] == 1 ? 'success' : (status[`week${item + 1}u1`] == 0 && item + 1 < currentWeek) ? "info" : "error"}
              disabled={item + 1 > totalWeeks}
              onClick={() => onstatusChanged({ id, table: STATUS, [`week${item + 1}u1`]: status[`week${item + 1}u1`] == 1 ? 0 : 1 })}
              style={{ minWidth: '40px', padding: '4px 8px' }}
            >
              {(typeId == 1) ? "1" : "1"}
            </Button>

            <Button
              variant="contained"
              size="small"
              sx={{ margin: "10px" }}
              color={status[`week${item + 1}u2`] == 1 ? 'success' : (status[`week${item + 1}u2`] == 0 && item + 1 < currentWeek) ? "info" : "error"}
              style={{ minWidth: '40px', padding: '4px 8px' }}
              disabled={item + 1 > totalWeeks}
              onClick={() => onstatusChanged({ id, table: STATUS, [`week${item + 1}u2`]: status[`week${item + 1}u2`] == 1 ? 0 : 1 })}
            >
              {(typeId == 1) ? "2" : "2"}
            </Button>

            {(pack == 3) && (
              <Button
                variant="contained"
                size="small"
                sx={{ margin: "10px" }}
                color={status[`week${item + 1}u3`] == 1 ? 'success' : (status[`week${item + 1}u3`] == 0 && item + 1 < currentWeek) ? "info" : "error"}
                style={{ minWidth: '40px', padding: '4px 8px' }}
                disabled={item + 1 > totalWeeks}
                onClick={() => onstatusChanged({ id, table: STATUS, [`week${item + 1}u3`]: status[`week${item + 1}u3`] == 1 ? 0 : 1 })}
              >
                3
              </Button>
            )}
          </TableCell>
        )
      ))}
    </TableRow>
  );

}
