import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ setIsOpen, search, setSearch }) => {
    return (
        <>
            {/* Navbar */}
            <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                {/* Mobile Toggle */}
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <button
                        className="nav-item nav-link px-0 me-xl-4 border-0 bg-transparent"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <i className="bx bx-menu bx-sm" />
                    </button>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    {/* Search */}
                    <div className="navbar-nav align-items-center">
                        <div className="nav-item d-flex align-items-center">
                            <i className="bx bx-search fs-4 lh-0" />
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search student..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* /Search */}
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* User */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex">
                                            <div className="shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img src="../assets/img/avatars/1.png" alt className="w-px-40 h-auto rounded-circle" />
                                                </div>
                                            </div>
                                            <div className="grow">
                                                <span className="fw-semibold d-block">John Doe</span>
                                                <small className="text-muted">Admin</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-user me-2" />
                                        <span className="align-middle">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-cog me-2" />
                                        <span className="align-middle">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="d-flex align-items-center align-middle">
                                            <i className="shrink-0 bx bx-credit-card me-2" />
                                            <span className="grow align-middle">Billing</span>
                                            <span className="shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider" />
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/">
                                        <i className="bx bx-power-off me-2" />
                                        <span className="align-middle">Log Out</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        {/*/ User */}
                    </ul>
                </div>
            </nav>
            {/* / Navbar */}
        </>
    )
}

export default Navbar
