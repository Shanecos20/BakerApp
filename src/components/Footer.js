const Footer = () => {
  return (
    <footer className="bg-light text-center py-4 border-top mt-5" style={{ fontFamily: "'Caveat', cursive" }}>
      <div className="container">
        <p className="mb-0 fw-bold" style={{ fontSize: '1.3rem' }}>Bakehouse Recipes</p>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Bakehouse. Crafted with love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
