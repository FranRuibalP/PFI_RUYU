import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  return (
    <AppBar 
    position="fixed"  // Hacer que el Header sea fijo
    sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}  // Asegurar que esté por encima del menú
  >
      <Toolbar>
        {/* Logo a la izquierda */}
        <Box sx={{ flexGrow: 1 }}>
          <Image src="/complete_logo.png" alt="Logo" width={150} height={50} />
        </Box>

        {/* Imagen de usuario a la derecha */}
        <IconButton edge="end" color="inherit">
          <Avatar alt="Usuario" src="/user.png" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}