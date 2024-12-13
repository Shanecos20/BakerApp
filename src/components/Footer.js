// Footer component to display the website's footer
const Footer = () => {
  return (
    // Footer element with styling classes and inline font family
    <footer className="bg-light text-center py-4 border-top mt-5" style={{ fontFamily: "'Caveat', cursive" }}>
      <div className="container">
        {/* Website name with bold styling and increased font size */}
        <p className="mb-0 fw-bold" style={{ fontSize: '1.3rem' }}>Bakehouse Recipes</p>
        {/* Copyright notice with dynamic current year */}
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Bakehouse. Crafted with love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
