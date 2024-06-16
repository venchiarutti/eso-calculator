import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PenetrationPage from './PenetrationPage';
import CriticalDamagePage from './CriticalDamagePage';
import HomePage from './HomePage';
import "./App.css";

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <div className="logo">
                        <Link to="/"><img src="logo.png" alt="Logo"/></Link>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/penetration">Penetration</Link></li>
                            <li><Link to="/critical-damage">Critical Damage</Link></li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/penetration" element={<PenetrationPage/>}/>
                    <Route path="/critical-damage" element={<CriticalDamagePage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;