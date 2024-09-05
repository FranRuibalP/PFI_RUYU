import Header from '../components/Header';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h2" gutterBottom>
          ¡Bienvenido a mi aplicación Next.js con Material UI!
        </Typography>
      </Container>
    </>
  );
}