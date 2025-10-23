import React, { useEffect, useState } from "react";
import { 
  getConges, 
  deleteConge, 
  searchCongesByDate, 
  searchCongesByMatricule 
} from "../services/congeService";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaCalendarAlt, FaEdit, FaTrash, FaUmbrellaBeach, FaUser } from "react-icons/fa";
import "./ListeConge.css";

function ListeConge() {
  const [conges, setConges] = useState([]);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");     
  const [matricule, setMatricule] = useState(""); // recherche live par matricule

  // Charger la liste des congés au chargement de la page
  useEffect(() => {
    fetchConges();
  }, []);

  // Recherche live par matricule
  useEffect(() => {
    const fetchByMatricule = async () => {
      if (matricule.trim() === "") {
        fetchConges(); // recharger tout si champ vide
      } else {
        try {
          const data = await searchCongesByMatricule(matricule.trim());
          if (data.success && Array.isArray(data.conges)) setConges(data.conges);
          else setConges([]);
        } catch (error) {
          console.error("Erreur recherche matricule :", error);
          setConges([]);
        }
      }
    };
    fetchByMatricule();
  }, [matricule]);

  const fetchConges = async () => {
    try {
      const data = await getConges();
      if (data.success && Array.isArray(data.conges)) setConges(data.conges);
      else setConges([]);
    } catch (error) {
      console.error("Erreur lors du chargement des congés :", error);
      setConges([]);
    }
  };

  const handleDelete = async (id_conge) => {
    if (window.confirm("Voulez-vous supprimer ce congé ?")) {
      try {
        const result = await deleteConge(id_conge);
        if (result.success) fetchConges();
        else alert(result.error);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  // Recherche par dates
  const handleSearchByDate = async () => {
    if (!startDate || !endDate) return alert("Veuillez sélectionner les deux dates !");
    try {
      const data = await searchCongesByDate(startDate, endDate);
      if (data.success && Array.isArray(data.conges)) setConges(data.conges);
      else setConges([]);
    } catch (error) {
      console.error("Erreur lors de la recherche par dates :", error);
      setConges([]);
    }
  };

  return (
    <div className="liste-conges-container">
      {/* Header Section */}
      <div className="conges-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUmbrellaBeach />
          </div>
          <div className="header-text">
            <h1>Gestion des Congés</h1>
            <p>Liste et gestion des congés des employés</p>
          </div>
        </div>
      </div>

      <div className="conges-content">
        {/* Carte principale */}
        <div className="conges-card">
          {/* Header avec bouton */}
          <div className="card-header">
            <h2>Liste des Congés</h2>
            <Link to="/conges/ajouter" className="btn-add-conge">
              <FaPlus className="btn-icon" />
              Ajouter un congé
            </Link>
          </div>

          {/* Section de recherche et filtres */}
          <div className="filters-section">
            {/* Recherche par dates */}
            <div className="date-filter-group">
              <div className="filter-label">
                <FaCalendarAlt className="filter-icon" />
                Recherche par période
              </div>
              <div className="date-inputs">
                <div className="date-input">
                  <label>Date de début</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-picker"
                  />
                </div>
                <div className="date-input">
                  <label>Date de fin</label>
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

            {/* Recherche par matricule */}
            <div className="search-group">
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher par matricule..."
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="search-hint">
                La recherche par matricule se fait automatiquement
              </div>
            </div>
          </div>

          {/* Tableau des congés */}
          <div className="table-container">
            {(!conges || conges.length === 0) ? (
              <div className="no-data">
                <FaUmbrellaBeach className="no-data-icon" />
                <h3>Aucun congé trouvé</h3>
                <p>
                  {matricule || startDate || endDate 
                    ? "Aucun congé ne correspond à vos critères de recherche" 
                    : "Aucun congé enregistré pour le moment"
                  }
                </p>
              </div>
            ) : (
              <table className="conges-table">
                <thead>
                  <tr>
                    <th className="col-id">ID</th>
                    <th className="col-matricule">Matricule</th>
                    <th className="col-debut">Date Début</th>
                    <th className="col-fin">Date Fin</th>
                    <th className="col-type">Type de congé</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {conges.map((c) => (
                    <tr key={c.id_conge} className="conge-row">
                      <td className="conge-id">{c.id_conge}</td>
                      <td className="conge-matricule">
                        <div className="matricule-cell">
                          <FaUser className="cell-icon" />
                          {c.matricule}
                        </div>
                      </td>
                      <td className="conge-date-debut">
                        <div className="date-cell">
                          <FaCalendarAlt className="cell-icon" />
                          {c.date_debut}
                        </div>
                      </td>
                      <td className="conge-date-fin">
                        <div className="date-cell">
                          <FaCalendarAlt className="cell-icon" />
                          {c.date_fin}
                        </div>
                      </td>
                      <td className="conge-type">
                        <span className={`type-badge type-${c.type_conge?.toLowerCase().replace(' ', '-').replace('é', 'e')}`}>
                          <FaUmbrellaBeach className="type-icon" />
                          {c.type_conge}
                        </span>
                      </td>
                      <td className="conge-actions">
                        <Link
                          to={`/conges/modifier/${c.id_conge}`}
                          className="btn-edit"
                        >
                          <FaEdit className="btn-icon" />
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id_conge)}
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
          <div className="conges-stats">
            <div className="stat-item">
              <span className="stat-number">{conges?.length || 0}</span>
              <span className="stat-label">Congés au total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {conges?.filter(c => {
                  const today = new Date();
                  const debut = new Date(c.date_debut);
                  const fin = new Date(c.date_fin);
                  return debut <= today && fin >= today;
                }).length || 0}
              </span>
              <span className="stat-label">Congés en cours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeConge;