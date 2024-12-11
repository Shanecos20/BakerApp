import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem' }}>
          Bakehouse Recipes
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" className="text-secondary fw-semibold">Home</Nav.Link>
          <Nav.Link href="/create" className="text-secondary fw-semibold">Add Recipe</Nav.Link>
          <Nav.Link href="/read" className="text-secondary fw-semibold">All Recipes</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
