// pages/_app.js
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Box sx={{ display: 'flex' }}>
          {/* Menú lateral */}
          <Sidebar />

          {/* Contenido principal */}
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px',backgroundColor:'#EFEFEF'}}>
            <Component {...pageProps} />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
