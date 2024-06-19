
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from "react";
import { UserTable } from './UserTable';
// Adjust the import path as necessary
import { PatientTable } from './PatientTable';
import AppWidgetSummary from '../app-widget-summary'; // Adjust the import path as necessary
import { callAxiosApi, getDashboardData } from 'src/utils/api_utils';

// ----------------------------------------------------------------------

export default function AppView() {

  const [data, setData] = useState({});

useEffect(() => { 
  console.log('ddddddddddddddddddddddd')
  fetchdata()
}, []);

const fetchdata = async() =>{
  let data = await  callAxiosApi(getDashboardData)
    console.log("DATAS>>>>>",data)
    setData(data?.data)
}


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Patients"
            total={data?.totalCount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Dhairya's Patients"
            total={data?.patientTypeCounts?.type1}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Nidhi's Patients"
            total={data?.patientTypeCounts?.type2}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Patients
          </Typography>
          <PatientTable patients={data?.activePatients}/>
        </Grid>
      </Grid>
    </Container>
  );
}
