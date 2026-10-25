import React from 'react';
import { NavLink } from 'react-router';

export default function AdminNavbar() {
  // RESTORE: Original active state styling using CSS classes
  function getNavLinkClass({ isActive }) {
    const baseClasses = "nav-link";
    return isActive 
      ? `${baseClasses} active` 
      : baseClasses;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <span className="navbar-brand" style={{ fontWeight: '600' }}>Admin Dashboard</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAdmin"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarAdmin">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={getNavLinkClass}
                to="/admin/add-product"
              >
                Add Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={getNavLinkClass}
                to="/admin/products"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={getNavLinkClass}
                to="/admin/contacts"
              >
                Contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={getNavLinkClass}
                to="/admin/user-data"
              >
                User Data
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
