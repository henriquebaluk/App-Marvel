import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'; // Importa componentes do React Bootstrap para criar o cabeçalho
import { FaHome, FaInfoCircle, FaGithub } from 'react-icons/fa'; // Importa ícones FontAwesome para os links de navegação

function Header() {
  return (
    // Componente Navbar, estiliza com a cor de fundo 'primary' e variante 'dark'
    // A classe 'py-3' adiciona padding vertical para o cabeçalho
    <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
      <Container>

        {/* Marca o nome do site */}
        <Navbar.Brand href="#home">
          Mundo Marvel
        </Navbar.Brand>
        
        {/* Botão para expandir/colapsar o menu em dispositivos móveis */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Área de navegação que será exibida ou oculta  */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">

            {/* página inicial */}
            <Nav.Link href="#home" className="text-light">
              <FaHome className="mr-2" />
              inicio
            </Nav.Link>

            {/* seção sobre */}
            <Nav.Link href="#about" className="text-light">
              <FaInfoCircle className="mr-2" /> 
              Sobre
            </Nav.Link>

            {/* Link GitHub*/}
            <Nav.Link href="https://github.com" target="_blank" className="text-light">
              <FaGithub className="mr-2" /> 
              GitHub
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
