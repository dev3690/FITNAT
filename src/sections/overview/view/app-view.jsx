
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from "react";
import { CircularProgress, Box } from '@mui/material';
import { UserTable } from './UserTable';
// Adjust the import path as necessary
import { PatientTable } from './PatientTable';
import AppWidgetSummary from '../app-widget-summary'; // Adjust the import path as necessary
import { callAxiosApi, getDashboardData } from 'src/utils/api_utils';

import { getLocalItem } from 'src/utils/local_operations';
// ----------------------------------------------------------------------

export default function AppView() {

  let localData = getLocalItem("data")
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => { 
  console.log('ddddddddddddddddddddddd')
  fetchdata()
}, []);

const fetchdata = async() =>{
  setIsLoading(true)

  let data = await  callAxiosApi(getDashboardData)
    console.log("DATAS>>>>>",data)
    setData(data?.data)
    setIsLoading(false)

  }


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, {localData?.name} 👋
      </Typography>

      <Grid container spacing={4}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Patients"
            total={data?.totalCount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

          <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Dhairya's Patients"
            total={data?.patientTypeCounts?.type1}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

         <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Nidhi's Patients"
            total={data?.patientTypeCounts?.type2}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        
        <Grid item xs={12} md={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Patients
          </Typography>
          {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress />
              </Box>
            ) : <PatientTable patients={data?.activePatients}/>}
        </Grid>
      </Grid>
    </Container>
  );
}
