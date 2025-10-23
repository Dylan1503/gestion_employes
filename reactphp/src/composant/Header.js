import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import logoJirama from "../assets/logo-jirama.png"; // adapte le chemin

function Header() {
  const location = useLocation();

  return (
    <header className="custom-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
        <Link className="navbar-brand" to="/">
        <img src={logoJirama} alt="JIRAMA" className="brand-logo" />
        JIRAMA
        </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Accueil */}
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`} 
                  to="/"
                >
                  Accueil
                </Link>
              </li>

              {/* Dropdown Services */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${location.pathname.startsWith("/services") ? "active" : ""}`}
                  id="servicesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </button>
                <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/services" ? "active" : ""}`} 
                      to="/services"
                    >
                      Liste des services
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/services/ajouter" ? "active" : ""}`} 
                      to="/services/ajouter"
                    >
                      Ajouter un service
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown Contrats */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${location.pathname.startsWith("/contrats") ? "active" : ""}`}
                  id="contratsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Contrats
                </button>
                <ul className="dropdown-menu" aria-labelledby="contratsDropdown">
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/contrats" ? "active" : ""}`} 
                      to="/contrats"
                    >
                      Liste des contrats
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/contrats/ajouter" ? "active" : ""}`} 
                      to="/contrats/ajouter"
                    >
                      Ajouter un contrat
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown Employés */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${location.pathname.startsWith("/employes") ? "active" : ""}`}
                  id="employesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Employés
                </button>
                <ul className="dropdown-menu" aria-labelledby="employesDropdown">
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/employes" ? "active" : ""}`} 
                      to="/employes"
                    >
                      Liste des employés
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/employes/ajouter" ? "active" : ""}`} 
                      to="/employes/ajouter"
                    >
                      Ajouter un employé
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown Congés */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${location.pathname.startsWith("/conges") ? "active" : ""}`}
                  id="congesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Congés
                </button>
                <ul className="dropdown-menu" aria-labelledby="congesDropdown">
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/conges" ? "active" : ""}`} 
                      to="/conges"
                    >
                      Liste des congés
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/conges/ajouter" ? "active" : ""}`} 
                      to="/conges/ajouter"
                    >
                      Ajouter un congé
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown Absences */}
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle btn btn-link ${location.pathname.startsWith("/absences") ? "active" : ""}`}
                  id="absencesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Absences
                </button>
                <ul className="dropdown-menu" aria-labelledby="absencesDropdown">
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/absences" ? "active" : ""}`} 
                      to="/absences"
                    >
                      Liste des absences
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className={`dropdown-item ${location.pathname === "/absences/ajouter" ? "active" : ""}`} 
                      to="/absences/ajouter"
                    >
                      Ajouter une absence
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;