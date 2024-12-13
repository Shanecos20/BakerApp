// Header.js
// Enhanced Header component with a background image, centered text and button, and additional spacing below.

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Header Component
 * 
 * This component serves as a visually appealing header/banner for the Content page.
 * It features a background image with centered text and a call-to-action button.
 * Additional spacing is added below the header to separate it from subsequent content.
 */
const Header = () => {
  // URL of the background image. Replace with a relevant image URL that fits your theme.
  const backgroundImageUrl = 'https://d23hgm0tds3lcv.cloudfront.net/wp-content/uploads/2022/11/22-10-Wholesale-Bakery-Bread-Pastry-WEB-0233-Edit-1.jpg'; // Replace with a relevant hero image URL

  return (
    <header
      style={{
        backgroundImage: `url(${backgroundImageUrl})`, // Set the background image
        backgroundSize: 'cover', // Ensure the image covers the entire header area
        backgroundPosition: 'center', // Center the background image
        height: '400px', // Set a fixed height for the header
        position: 'relative', // Position relative to allow overlaying content
        color: 'white', // Text color for better contrast against the background
      }}
      className="d-flex align-items-center" // Use Flexbox to center content vertically
    >
      {/* Overlay to darken the background image for better text readability */}
      <div
        style={{
          position: 'absolute', // Position absolute to cover the entire header
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
          zIndex: 1, // Ensure the overlay is behind the content
        }}
      ></div>

      {/* Container to hold the header content */}
      <Container
        className="text-center" // Center text horizontally
        style={{ position: 'relative', zIndex: 2 }} // Position relative to appear above the overlay
      >
        {/* Main Title */}
        <h1
          className="fw-bold mb-3"
          style={{
            fontFamily: "'Caveat', cursive", // Custom cursive font
            fontSize: '3rem', // Large font size for prominence
          }}
        >
          Welcome to Bakehouse Recipes
        </h1>

        {/* Subtitle */}
        <p
          className="mb-4"
          style={{
            fontFamily: "'Nunito', sans-serif", // Clean sans-serif font
            fontSize: '1.2rem', // Slightly larger than default for readability
            maxWidth: '600px', // Limit the width for better readability
            margin: '0 auto', // Center the subtitle
          }}
        >
          Discover and share delicious baked recipes from around the world. 
          <br />Below are some of our top-rated recipes to inspire your next bake!
        </p>

        {/* Call-to-Action Button */}
        <Link to="/read">
          <Button
            variant="primary" // Bootstrap primary color for visibility
            className="fw-bold px-4 py-2" // Bold text and padding for a clickable area
            style={{ fontSize: '1rem' }} // Consistent font size
          >
            View All Recipes
          </Button>
        </Link>
      </Container>

      {/* Additional spacing below the header */}
      <div style={{ height: '20px' }}></div>
    </header>
  );
}

export default Header;
