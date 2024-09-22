import { Link, Outlet } from 'react-router-dom'



export default function Routter() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold m-2" href="#">Project</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav fw-bold mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">SignIn</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">ContactUs</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div>
                <Outlet />
            </div>
        </div>
    )
}