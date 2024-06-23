import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'src/routes/hooks';
import { setLocalItem } from 'src/utils/local_operations';
import { loginApi, callAxiosApi } from 'src/utils/api_utils';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
// import LogoImage from 'src/components/iconify/';  // Adjust the path to your logo

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await callAxiosApi(loginApi, {
        username,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        setLocalItem("data", response?.data?.data);
        router.push('/');
      } else {
        setError('Invalid username or password');
        toast.error('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password');
      toast.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="Username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
        style={{ marginTop: '15px' }}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height:"100vh"
        // height: '100vh',
        // overflow: 'auto',
      }}
    >
      <ToastContainer position="top-right" />
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100%', padding: 3 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            // height: '100vh',
            overflow: 'auto',
            textAlign: 'center', // Center the content inside the Card
          }}
        >
          {/* <img src="/src/components/iconify/fitnatlogo.png" alt="Logo" style={{ width: '150px', marginBottom: '16px' }} /> */}
          <img src="assets\fitnatlogo.png" alt="Logo" style={{ width: '150px', marginBottom: '16px' }} />
          <Typography variant="h4">Sign in to FITNAT</Typography>
          <Divider sx={{ my: 3 }} />
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}


