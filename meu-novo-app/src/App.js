import './App.css'; // Importa estilos específicos do App
import React from 'react'; // Importa React
import Marvel from './Marvel'; // Importa o componente Marvel
import Header from './Header'; // Importa o componente Header
import { Container, Row, Col, Button } from 'react-bootstrap'; // Importa componentes do React-Bootstrap

function App() {
  return (
    <div className="App">
      <Header /> {/* Adiciona o cabeçalho */}
      <Marvel /> {/* Adiciona o componente Marvel */}
    </div>
  );
}

export default App;
