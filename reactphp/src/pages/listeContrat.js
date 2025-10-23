import React, { useEffect, useState } from "react";
import { getContrats, deleteContrat, searchContratsByMatricule } from "../services/contratService";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFileContract, FaIdCard, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import "./ListeContrat.css";

function ListeContrat() {
  const [contrats, setContrats] = useState([]);
  const [query, setQuery] = useState(""); // pour la recherche par matricule

  useEffect(() => {
    fetchContrats();
  }, []);

  useEffect(() => {
    // Dès que query change, on effectue la recherche
    if (query.trim() === "") {
      fetchContrats();
    } else {
      handleSearch(query);
    }
  }, [query]);

  const fetchContrats = async () => {
    const data = await getContrats();
    if (data.success) setContrats(data.contrats);
  };

  const handleSearch = async (matricule) => {
    const data = await searchContratsByMatricule(matricule);
    if (data.success) setContrats(data.contrats);
    else setContrats([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce contrat ?")) {
      const result = await deleteContrat(id);
      if (result.success) {
        alert(result.message);
        fetchContrats();
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="liste-contrats-container">
      {/* Header Section */}
      <div className="contrats-header">
        <div className="header-content">
          <div className="header-icon">
            <FaFileContract />
          </div>
          <div className="header-text">
            <h1>Gestion des Contrats</h1>
            <p>Liste et gestion des contrats des employés</p>
          </div>
        </div>
      </div>

      <div className="contrats-content">
        {/* Carte principale */}
        <div className="contrats-card">
          {/* Header avec bouton */}
          <div className="card-header">
            <h2>Liste des Contrats</h2>
            <Link to="/contrats/ajouter" className="btn-add-contrat">
              <FaPlus className="btn-icon" />
              Ajouter un contrat
            </Link>
          </div>

          {/* Section de recherche */}
          <div className="search-section">
            <div className="search-group">
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher par matricule..."
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="search-hint">
                Saisissez un matricule pour filtrer les contrats
              </div>
            </div>
          </div>

          {/* Tableau des contrats */}
          <div className="table-container">
            {contrats.length === 0 ? (
              <div className="no-data">
                <FaFileContract className="no-data-icon" />
                <h3>Aucun contrat trouvé</h3>
                <p>{query ? "Aucun contrat correspondant à ce matricule" : "Aucun contrat enregistré pour le moment"}</p>
              </div>
            ) : (
              <table className="contrats-table">
                <thead>
                  <tr>
                    <th className="col-id">ID</th>
                    <th className="col-matricule">Matricule</th>
                    <th className="col-type">Type</th>
                    <th className="col-debut">Date Début</th>
                    <th className="col-fin">Date Fin</th>
                    <th className="col-statut">Statut</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contrats.map((c) => (
                    <tr key={c.id_contrat} className="contrat-row">
                      <td className="contrat-id">{c.id_contrat}</td>
                      <td className="contrat-matricule">
                        <div className="matricule-cell">
                          <FaIdCard className="cell-icon" />
                          {c.matricule || "Non affecté"}
                        </div>
                      </td>
                      <td className="contrat-type">
                        <span className={`type-badge type-${c.type_contrat?.toLowerCase()}`}>
                          {c.type_contrat}
                        </span>
                      </td>
                      <td className="contrat-date-debut">
                        <div className="date-cell">
                          <FaCalendarAlt className="cell-icon" />
                          {c.date_debut}
                        </div>
                      </td>
                      <td className="contrat-date-fin">
                        <div className="date-cell">
                          <FaCalendarAlt className="cell-icon" />
                          {c.date_fin}
                        </div>
                      </td>
                      <td className="contrat-statut">
                        <span className={`statut-badge statut-${c.statut?.toLowerCase().replace(' ', '-')}`}>
                          <FaCheckCircle className="statut-icon" />
                          {c.statut}
                        </span>
                      </td>
                      <td className="contrat-actions">
                        <Link
                          to={`/contrats/modifier/${c.id_contrat}`}
                          className="btn-edit"
                        >
                          <FaEdit className="btn-icon" />
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id_contrat)}
                          className="btn-delete"
                        >
                          <FaTrash className="btn-icon" />
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Statistiques */}
          <div className="contrats-stats">
            <div className="stat-item">
              <span className="stat-number">{contrats.length}</span>
              <span className="stat-label">Contrats au total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {contrats.filter(c => c.statut === 'Actif').length}
              </span>
              <span className="stat-label">Contrats actifs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeContrat;