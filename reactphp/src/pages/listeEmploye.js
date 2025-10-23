import React, { useEffect, useState } from "react";
import {
  getEmployes,
  deleteEmploye,
  searchEmployes,
  searchEmployeByDate,
  searchEmployeByService,
  getServices,
} from "../services/employeService";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaFilter, FaCalendarAlt, FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import "./ListeEmploye.css";

function ListeEmploye() {
  const [employes, setEmployes] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchEmployes();
    fetchServices();
  }, []);

  const fetchEmployes = async () => {
    const data = await getEmployes();
    if (data.success) setEmployes(data.employes);
  };

  const fetchServices = async () => {
    const data = await getServices();
    if (data.success) setServices(data.services);
  };

  const handleSearchByText = async (text) => {
    if (text.trim() === "") return fetchEmployes();
    const data = await searchEmployes(text);
    setEmployes(data.success ? data.employes : []);
  };

  const handleSearchByDate = async () => {
    if (!startDate || !endDate) return alert("Veuillez sélectionner les deux dates !");
    const data = await searchEmployeByDate(startDate, endDate);
    setEmployes(data.success ? data.employes : []);
  };

  const handleFilterByService = async (id_service) => {
    setSelectedService(id_service);
    if (id_service === "") return fetchEmployes();
    const data = await searchEmployeByService(id_service);
    setEmployes(data.success ? data.employes : []);
  };

  const handleDelete = async (matricule) => {
    if (window.confirm("Voulez-vous supprimer cet employé ?")) {
      await deleteEmploye(matricule);
      fetchEmployes();
    }
  };

  return (
    <div className="liste-employes-container">
      {/* Header Section */}
      <div className="employes-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUsers />
          </div>
          <div className="header-text">
            <h1>Gestion des Employés</h1>
            <p>Liste et gestion du personnel de l'entreprise</p>
          </div>
        </div>
      </div>

      <div className="employes-content">
        {/* Carte principale */}
        <div className="employes-card">
          {/* Header avec bouton */}
          <div className="card-header">
            <h2>Liste des Employés</h2>
            <Link to="/employes/ajouter" className="btn-add-employe">
              <FaPlus className="btn-icon" />
              Ajouter un employé
            </Link>
          </div>

          {/* Section de recherche et filtres */}
          <div className="filters-section">
            {/* Recherche par texte */}
            <div className="search-group">
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, prénom ou matricule..."
                  className="search-input"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    handleSearchByText(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Filtrage par service */}
            <div className="filter-group">
              <div className="filter-label">
                <FaFilter className="filter-icon" />
                Filtrer par service
              </div>
              <select
                className="filter-select"
                value={selectedService}
                onChange={(e) => handleFilterByService(e.target.value)}
              >
                <option value="">Tous les services</option>
                {services.length > 0 ? (
                  services.map((s) => (
                    <option key={s.id_service} value={s.id_service}>
                      {s.libelle}
                    </option>
                  ))
                ) : (
                  <option disabled>Aucun service disponible</option>
                )}
              </select>
            </div>

            {/* Recherche par date */}
            <div className="date-filter-group">
              <div className="filter-label">
                <FaCalendarAlt className="filter-icon" />
                Recherche par date d'embauche
              </div>
              <div className="date-inputs">
                <div className="date-input">
                  <label>Du</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-picker"
                  />
                </div>
                <div className="date-input">
                  <label>Au</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-picker"
                  />
                </div>
                <button onClick={handleSearchByDate} className="btn-date-search">
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          {/* Tableau des employés */}
          <div className="table-container">
            <table className="employes-table">
              <thead>
                <tr>
                  <th className="col-matricule">Matricule</th>
                  <th className="col-nom">Nom</th>
                  <th className="col-prenom">Prénoms</th>
                  <th className="col-sexe">Sexe</th>
                  <th className="col-date">Naissance</th>
                  <th className="col-adresse">Adresse</th>
                  <th className="col-phone">Téléphone</th>
                  <th className="col-email">Email</th>
                  <th className="col-embauche">Embauche</th>
                  <th className="col-salaire">Salaire</th>
                  <th className="col-service">Service</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employes.length > 0 ? (
                  employes.map((e) => (
                    <tr key={e.matricule} className="employe-row">
                      <td className="employe-matricule">{e.matricule}</td>
                      <td className="employe-nom">{e.nom}</td>
                      <td className="employe-prenoms">{e.prenoms}</td>
                      <td className="employe-sexe">{e.sexe}</td>
                      <td className="employe-date">{e.date_naissance}</td>
                      <td className="employe-adresse">{e.adresse}</td>
                      <td className="employe-phone">{e.telephone}</td>
                      <td className="employe-email">{e.email}</td>
                      <td className="employe-embauche">{e.date_embauche}</td>
                      <td className="employe-salaire">{e.salaire_base}</td>
                      <td className="employe-service">{e.id_service}</td>
                      <td className="employe-actions">
                        <Link
                          to={`/employes/modifier/${e.matricule}`}
                          className="btn-edit"
                        >
                          <FaEdit className="btn-icon" />
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(e.matricule)}
                          className="btn-delete"
                        >
                          <FaTrash className="btn-icon" />
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-data">
                    <td colSpan="12">
                      <div className="no-data-content">
                        <FaUsers className="no-data-icon" />
                        <p>Aucun employé trouvé</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Statistiques */}
          <div className="employes-stats">
            <div className="stat-item">
              <span className="stat-number">{employes.length}</span>
              <span className="stat-label">Employés au total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeEmploye;