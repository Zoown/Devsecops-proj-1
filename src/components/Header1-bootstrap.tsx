import logo from "../assets/images/logo.png";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid"> {/* Keep element structure - Responsive design */}
        
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" style={{ width: "170px", height: "60px", paddingLeft: "10px" }} />
        </a>

        {/* Navbar Toggler for mobile or small window */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> {/* Align right */}
          <ul className="navbar-nav">
            <li className="nav-item" ><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/apartments">Apartments</a></li>
            <li className="nav-item"><a className="nav-link" href="/admin">Admin</a></li>
          </ul>
        </div>

        {/* Search Bar */}
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

      </div>
    </nav>
  );
}

export default Header;
