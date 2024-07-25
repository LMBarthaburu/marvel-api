import { Route, Routes, useParams } from 'react-router-dom';
import Detalles from './Paginas/Detalles';
import Home from './Paginas/Home';
import Personajes from './Paginas/Personajes';
import Eventos from './Paginas/Eventos';
import Error from './Paginas/Error';


function App() {

  
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:tipo/:id' element={<RenderComponent />} />
        <Route path='/*' element={<Error/>}/>
    </Routes>
  );
};

const RenderComponent = () => {
  const { tipo } = useParams();
  switch (tipo) {
    case 'comics':
      return <Detalles />;
    case 'characters':
      return <Personajes />;
    case 'events':
      return <Eventos />;
    default:
      return <Home/>; // Puedes manejar aquí el caso de tipo desconocido
  }
};

export default App;
