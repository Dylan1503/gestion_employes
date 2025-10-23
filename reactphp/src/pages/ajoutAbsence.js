import React, { useState, useEffect } from "react";
import { addAbsence } from "../services/absenceService";
import { getEmployes } from "../services/employeService";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft, FaSave, FaUserSlash, FaUser, FaCalendarAlt, FaIdCard, FaExclamationTriangle, FaNotesMedical } from "react-icons/fa";
import "./AjouterAbsence.css";

function AjouterAbsence() {
  const [form, setForm] = useState({
    matricule: "",
    date_absence: "",
    motif: "",
  });
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const data = await getEmployes();
        if (data.success) setEmployes(data.employes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Effacer l'erreur quand l'utilisateur modifie le formulaire
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await addAbsence(form);
      if (result.success) navigate("/absences");
      else setError(result.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-absence-container">
      {/* Header Section */}
      <div className="absence-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUserSlash />
          </div>
          <div className="header-text">
            <h1>Ajouter une Absence</h1>
            <p>Enregistrer une nouvelle absence d'employé</p>
          </div>
        </div>
      </div>

      <div className="absence-form-content">
        <div className="form-container">
          {/* Carte du formulaire */}
          <div className="form-card">
            <div className="card-header">
              <button 
                className="btn-back"
                onClick={() => navigate("/absences")}
              >
                <FaArrowLeft className="btn-icon" />
                Retour à la liste
              </button>
              <div className="form-title">
                <FaPlus className="title-icon" />
                <h2>Nouvelle Absence</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="absence-form">
              <div className="form-grid">
                {/* Section Employé */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaUser className="section-icon" />
                    Informations de l'Employé
                  </h3>
                  
                  <div className="form-group">
                    <label htmlFor="matricule" className="form-label">
                      <FaIdCard className="input-icon" />
                      Matricule de l'employé
                    </label>
                    <input
                      list="employes"
                      id="matricule"
                      name="matricule"
                      className="form-input"
                      value={form.matricule}
                      onChange={handleChange}
                      placeholder="Tapez ou sélectionnez un matricule"
                      required
                      disabled={loading}
                    />
                    <datalist id="employes">
                      {employes.map(e => (
                        <option key={e.matricule} value={e.matricule}>
                          {e.nom} {e.prenoms} ({e.matricule})
                        </option>
                      ))}
                    </datalist>
                    <div className="form-hint">
                      Sélectionnez un employé existant dans la liste
                    </div>
                  </div>
                </div>

                {/* Section Date */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaCalendarAlt className="section-icon" />
                    Date de l'Absence
                  </h3>

                  <div className="form-group">
                    <label htmlFor="date_absence" className="form-label">
                      <FaCalendarAlt className="input-icon" />
                      Date d'absence
                    </label>
                    <input
                      type="date"
                      id="date_absence"
                      name="date_absence"
                      className="form-input"
                      value={form.date_absence}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <div className="form-hint">
                      Sélectionnez la date à laquelle l'employé était absent
                    </div>
                  </div>
                </div>

                {/* Section Motif */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaNotesMedical className="section-icon" />
                    Motif de l'Absence
                  </h3>

                  <div className="form-group">
                    <label htmlFor="motif" className="form-label">
                      <FaExclamationTriangle className="input-icon" />
                      Motif de l'absence
                    </label>
                    <select
                      id="motif"
                      name="motif"
                      className="form-input"
                      value={form.motif}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Sélectionner le motif</option>
                      <option value="Maladie">Maladie</option>
                      <option value="Personnel">Raison personnelle</option>
                      <option value="Formation">Formation</option>
                      <option value="Urgence familiale">Urgence familiale</option>
                      <option value="Consultation médicale">Consultation médicale</option>
                      <option value="Autre">Autre</option>
                    </select>
                    <div className="form-hint">
                      Sélectionnez le motif principal de l'absence
                    </div>
                  </div>
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="error-message">
                  <FaExclamationTriangle className="error-icon" />
                  {error}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !form.matricule || !form.date_absence || !form.motif}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Enregistrer l'Absence
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/absences")}
                  disabled={loading}
                >
                  Annuler
                </button>
              </div>
            </form>

            {/* Informations supplémentaires */}
            <div className="form-info">
              <div className="info-item">
                <div className="info-icon">💡</div>
                <div className="info-text">
                  <strong>Conseil :</strong> Vérifiez que l'employé n'a pas déjà une absence enregistrée pour cette date
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📋</div>
                <div className="info-text">
                  <strong>Documentation :</strong> Les absences sont enregistrées dans le dossier de l'employé et peuvent être utilisées pour les statistiques
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterAbsence;