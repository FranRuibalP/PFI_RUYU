// components/Sidebar.js
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Ventas', icon: <BarChartIcon />, path: '/ventas' },
    { text: 'Géneros', icon: <CategoryIcon />, path: '/generos' },
    { text: 'Hits', icon: <StarIcon />, path: '/hits' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box', 
          marginTop: '64px',  // Deja espacio para el Header
          backgroundColor: '#D8F3DC',  // Color de fondo
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => {
          const isActive = router.pathname === item.path;

          return (
            <ListItem 
              button 
              key={index} 
              onClick={() => router.push(item.path)}
              sx={{
                borderRadius: '20px',  // Bordes redondeados
                margin: '10px',  // Margen
                width: '90%',  // Ancho
                backgroundColor: isActive ? '#74C69D' : 'inherit',  // Sombreado si está activo
                '&:hover': {
                  backgroundColor: '#52B788',  // Sombreado al pasar el mouse
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
