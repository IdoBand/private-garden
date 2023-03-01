import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <header>
                <Link to={'/'}>
                    <h1> | Private Garden </h1>
                </Link>
                

                <ul id="nav-container">
                    <li><Link to={'/Home'} className="nav-links">Home</Link></li>
                    <li><Link to={'MyGarden'}className="nav-links">My Garden</Link></li>
                    <li><Link className="nav-links">Identify Plant</Link></li>
                    <li><Link to={'LearnSomethingNew'} className="nav-links">Learn Something New</Link></li>
                    <li><Link className="nav-links">About</Link></li>
                </ul>
            </header>
            <Outlet/>
        </>
    )
}