import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ search, setSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={`layout-wrapper layout-content-navbar ${isOpen ? "layout-menu-expanded" : ""}`}>
                <div className="layout-container">
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    <div className="layout-page">
                        <Navbar setIsOpen={setIsOpen} search={search} setSearch={setSearch} />
                        <div className="container-xxl container-p-y">
                            <Outlet />
                        </div>
                    </div>
                </div>
                {/* Overlay for mobile */}
                {isOpen && (
                    <div
                        className="layout-overlay layout-menu-toggle"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}
            </div>
        </>
    )
}

export default Layout
