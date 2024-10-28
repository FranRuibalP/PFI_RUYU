import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  return (
    <AppBar 
    position="fixed"  
    sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}  
  >
      <Toolbar>
        {/* Logo a la izquierda */}
        <Box sx={{ flexGrow: 1 }}>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Box>

        {/* Imagen de usuario a la derecha */}
        <IconButton edge="end" color="inherit">
          <Avatar alt="Usuario" src="/user.png" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}