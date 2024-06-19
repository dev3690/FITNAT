import PropTypes from 'prop-types';
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Menu,
  MenuItem,
  ListItemText,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName,handleSelectedColumns }) {


  const [anchorEl, setAnchorEl] = useState(null);
  let optionList = [
    { id: 1, label: "Name" },
    { id: 2, label: "Package" },
    { id: 3, label: "Link" },
    { id: 4, label: "Start Date" },
    { id: 5, label: "End Date" },
    ...Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`).map((item, index) => (({ id: `${item}-${index}`, label: item })))
  ]
  const [selectedFilters, setSelectedFilters] = useState(optionList?.map((item)=>item?.label));


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filter) => () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    const currentIndex = selectedFilters.indexOf(filter);
    const newSelectedFilters = [...selectedFilters];

    if (currentIndex === -1) {
      newSelectedFilters.push(filter);
    } else {
      newSelectedFilters.splice(currentIndex, 1);
    }
    handleSelectedColumns(newSelectedFilters)

    setSelectedFilters(newSelectedFilters);
  };

  return (
    <>

      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  
                /> 
              </InputAdornment>
            }
          />
        )}

        {/* {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton onClick={handleClick}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )} */}
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FormControl component="fieldset">
          <FormGroup>
            <MenuItem>
              <ListItemText primary="Filter Options" />
            </MenuItem>
            {optionList?.map((item) => <MenuItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.includes(item?.label)}
                    onChange={handleFilterChange(item?.label)}
                  />
                }
                label={item?.label}
              />
            </MenuItem>)}
          </FormGroup>
        </FormControl>
      </Menu>
    </>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
