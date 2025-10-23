import React, { useEffect, useState } from "react";
import { getAbsence, updateAbsence } from "../services/absenceService";
import { getEmployes } from "../services/employeService";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaArrowLeft, FaSave, FaUserSlash, FaUser, FaCalendarAlt, FaIdCard, FaNotesMedical, FaExclamationTriangle } from "react-icons/fa";
import "./ModifierAbsence.css";

function ModifierAbsence() {
  const { id_abs } = useParams();
  const [form, setForm] = useState({ matricule: "", date_absence: "", motif: "" });
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAbsence(id_abs);
        if (data.success) setForm(data.absence);

        const empData = await getEmployes();
        if (empData.success) setEmployes(empData.employes);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        alert("Erreur lors du chargement de l'absence");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id_abs]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateAbsence({ ...form, id_abs });
      if (res.success) navigate("/absences");
      else alert(res.error);
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de modifier l'absence");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="modifier-absence-container">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Chargement de l'absence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modifier-absence-container">
      {/* Header Section */}
      <div className="absence-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUserSlash />
          </div>
          <div className="header-text">
            <h1>Modifier l'Absence</h1>
            <p>Mettre à jour les informations de l'absence</p>
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
                <FaEdit className="title-icon" />
                <h2>Modifier l'Absence #{id_abs}</h2>
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
                      Matricule de l'employé associé à cette absence
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
                      Date à laquelle l'employé était absent
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

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !form.matricule || !form.date_absence || !form.motif}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Modification en cours...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Mettre à jour l'Absence
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
                <div className="info-icon">📝</div>
                <div className="info-text">
                  <strong>Modification :</strong> Les changements seront appliqués immédiatement après la validation
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🆔</div>
                <div className="info-text">
                  <strong>ID de l'absence :</strong> {id_abs}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifierAbsence;