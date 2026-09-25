import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Learning App
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/react" className="nav-link">
              React
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/javascript" className="nav-link">
              JavaScript
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
