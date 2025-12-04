import './Home.css';

import { useNavigate } from 'react-router-dom';

export default function Home() {
     const navigation = useNavigate();

  return (
      <div className="home-page">
        <nav className="home-nav">
          <div className="nav-links">
            <button className="nav-button" onClick={() => navigation("/signup")}>New User</button>
            <button className="nav-button" onClick={() => navigation("/login")}>Exit</button>
          </div>
        </nav>

        <div className="home-content">
          <h1>Welcome to the Home Page!</h1>
          <p>This is the main area of the application.</p>
        </div>
      </div>
  )
};