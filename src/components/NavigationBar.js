// NavigationBar.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Array of user icon URLs (can be used for default avatars or user selection)
const userIcons = [
  'https://i.imgur.com/WtLuZh8.png',
  'https://i.imgur.com/mZfQ1Ky.png',
  'https://i.imgur.com/H5Zo5r6.png',
  'https://i.imgur.com/xEnIAt9.png'
];

const NavigationBar = () => {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  /**
   * useEffect hook to retrieve the authenticated user from localStorage
   * Sets the user state if a user is found, otherwise remains null
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Handler for logging out the user
   * Removes user data from localStorage, resets the user state, and redirects to the home page
   */
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Reset the user state
    window.location.href = '/'; // Redirect to the home page
  }

  return (
    // Navbar component with styling and responsive behavior
    <Navbar bg="light" data-bs-theme="light" className="border-bottom shadow-sm" expand="md">
      <Container>
        {/* Brand name with custom font and styling */}
        <Navbar.Brand href="/" className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem' }}>
          Bakehouse Recipes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" /> {/* Toggle button for mobile view */}
        <Navbar.Collapse id="navbarResponsive">
          {/* Navigation links aligned to the left */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-secondary fw-semibold">Home</Nav.Link>
            {user && <Nav.Link as={Link} to="/create" className="text-secondary fw-semibold">Add Recipe</Nav.Link>}
            <Nav.Link as={Link} to="/read" className="text-secondary fw-semibold">All Recipes</Nav.Link>
            {user && <Nav.Link as={Link} to="/my-recipes" className="text-secondary fw-semibold">My Recipes</Nav.Link>}
          </Nav>
          
          {/* User profile or authentication links aligned to the right */}
          <div>
            {user ? (
              // Dropdown menu for authenticated users
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="p-0 border-0">
                  {/* User profile icon */}
                  <Image 
                    src={user.icon} 
                    alt="Profile Icon" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* Logout option */}
                  <Dropdown.Item onClick={handleLogout} className="fw-bold">Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // Navigation links for unauthenticated users
              <Nav>
                <Nav.Link as={Link} to="/login" className="text-secondary fw-semibold">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-secondary fw-semibold">Register</Nav.Link>
              </Nav>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
