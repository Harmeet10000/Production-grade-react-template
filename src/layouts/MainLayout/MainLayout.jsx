const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <header className="header">
        <nav>App Navigation</nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 App</p>
      </footer>
    </div>
  );
};

export default MainLayout;