import React, { useEffect, useState } from "react";
import { getAbsences, deleteAbsence, searchAbsenceByDate } from "../services/absenceService";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaCalendarAlt, FaEdit, FaTrash, FaUserSlash, FaIdCard, FaExclamationTriangle } from "react-icons/fa";
import "./ListeAbsence.css";

function ListeAbsence() {
  const [absences, setAbsences] = useState([]);
  const [startDate, setStartDate] = useState(""); // date début
  const [endDate, setEndDate] = useState(""); // date fin

  useEffect(() => { fetchAbsences(); }, []);

  const fetchAbsences = async () => {
    const data = await getAbsences();
    if (data.success) setAbsences(data.absences);
    else setAbsences([]);
  };

  const handleSearchByDate = async () => {
    if (!startDate || !endDate) return alert("Veuillez sélectionner les deux dates !");
    const data = await searchAbsenceByDate(startDate, endDate);
    if (data.success) setAbsences(data.absences);
    else setAbsences([]);
  };

  const handleDelete = async (id_abs) => {
    if (window.confirm("Supprimer cette absence ?")) {
      const res = await deleteAbsence(id_abs);
      if (res.success) fetchAbsences();
      else alert(res.error);
    }
  };

  return (
    <div className="liste-absences-container">
      {/* Header Section */}
      <div className="absences-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUserSlash />
          </div>
          <div className="header-text">
            <h1>Gestion des Absences</h1>
            <p>Liste et gestion des absences du personnel</p>
          </div>
        </div>
      </div>

      <div className="absences-content">
        {/* Carte principale */}
        <div className="absences-card">
          {/* Header avec bouton */}
          <div className="card-header">
            <h2>Liste des Absences</h2>
            <Link to="/absences/ajouter" className="btn-add-absence">
              <FaPlus className="btn-icon" />
              Ajouter une absence
            </Link>
          </div>

          {/* Section de recherche */}
          <div className="search-section">
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
                  <FaSearch className="btn-icon" />
                  Rechercher
                </button>
              </div>
            </div>
          </div>

          {/* Tableau des absences */}
          <div className="table-container">
            {absences.length === 0 ? (
              <div className="no-data">
                <FaUserSlash className="no-data-icon" />
                <h3>Aucune absence enregistrée</h3>
                <p>
                  {startDate || endDate 
                    ? "Aucune absence ne correspond à la période sélectionnée" 
                    : "Commencez par ajouter une première absence"
                  }
                </p>
              </div>
            ) : (
              <table className="absences-table">
                <thead>
                  <tr>
                    <th className="col-id">ID</th>
                    <th className="col-matricule">Matricule</th>
                    <th className="col-date">Date</th>
                    <th className="col-motif">Motif</th>
                    <th className="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {absences.map(a => (
                    <tr key={a.id_abs} className="absence-row">
                      <td className="absence-id">{a.id_abs}</td>
                      <td className="absence-matricule">
                        <div className="matricule-cell">
                          <FaIdCard className="cell-icon" />
                          {a.matricule}
                        </div>
                      </td>
                      <td className="absence-date">
                        <div className="date-cell">
                          <FaCalendarAlt className="cell-icon" />
                          {a.date_absence}
                        </div>
                      </td>
                      <td className="absence-motif">
                        <span className={`motif-badge motif-${a.motif?.toLowerCase().replace(' ', '-').replace('é', 'e')}`}>
                          <FaExclamationTriangle className="motif-icon" />
                          {a.motif}
                        </span>
                      </td>
                      <td className="absence-actions">
                        <Link 
                          to={`/absences/modifier/${a.id_abs}`} 
                          className="btn-edit"
                        >
                          <FaEdit className="btn-icon" />
                          Modifier
                        </Link>
                        <button 
                          onClick={() => handleDelete(a.id_abs)} 
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
          <div className="absences-stats">
            <div className="stat-item">
              <span className="stat-number">{absences.length}</span>
              <span className="stat-label">Absences au total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {absences.filter(a => {
                  const today = new Date().toISOString().split('T')[0];
                  return a.date_absence === today;
                }).length}
              </span>
              <span className="stat-label">Absences aujourd'hui</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeAbsence;