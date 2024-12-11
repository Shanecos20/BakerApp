import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Defining the NavigationBar component to handle navigation links
const NavigationBar = () => {
  return (
    // Bootstrap Navbar component with dark background and expand on large screens
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* Brand name for the application */}
      <Navbar.Brand href="#">React App</Navbar.Brand>
      {/* Navigation links using react-router-dom's Link component */}
      <Nav className="mr-auto">
        {/* Link to the Home page */}
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        {/* Link to the Read page */}
        <Nav.Link as={Link} to="/read">Read</Nav.Link>
        {/* Link to the Create page */}
        <Nav.Link as={Link} to="/create">Create</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar; // Exporting the NavigationBar component for