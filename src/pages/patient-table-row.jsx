import { useState } from 'react';

import {
  Button,
  TableRow,
  TableCell,
  Box
} from '@mui/material';
import { getPackageName } from 'src/utils/local_operations';


export default function PatientTableRow({
  row,
  handleEdit,
  sr,
  isAdmin,
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
    <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell>{sr}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.mobile}</TableCell>
        <TableCell>{row.city+"/"+row.country}</TableCell>
        <TableCell>{row.pain?.split(",")?.join("\n")}</TableCell>
        <TableCell ><a href={row.url}  target="_blank" rel="noopener noreferrer">{row.url}</a></TableCell>
        <TableCell>{new Date(row.start_date).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(row.end_date).toLocaleDateString()}</TableCell>
        <TableCell>{getPackageName(row.package)}</TableCell>
        <TableCell>{row.created_by==1 ? "Dr. Dhairya" : "Dr. Nidhi"}</TableCell>
        <TableCell>{row.type_id==1 ? "Dr. Dhairya" : "Dr. Nidhi"}</TableCell>
        <TableCell align="right">
        <Box display="flex" justifyContent="flex-end">
            <Button variant='contained' disabled={!isAdmin} size='small' onClick={handleEdit} color='primary' sx={{marginRight:1}}>Edit</Button>
            <Button variant='contained' disabled={!isAdmin} size='small' color='error' onClick={()=>handleDelete(row.id)}>Delete</Button>
        </Box>
        </TableCell>
      
      </TableRow>
  );
}

