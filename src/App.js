import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NotFound from './NotFoundPage';

const App = () => {
  return (
    <Container sx={{marginTop: 5}} maxWidth='md'>
      <BrowserRouter> 
        <Routes>  
          <Route path='/' element={<HomePage />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>   
    </Container>
  );
}

export default App;
