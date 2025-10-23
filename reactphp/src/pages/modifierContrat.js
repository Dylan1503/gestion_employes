import React, { useEffect, useState } from "react";
import { updateContrat, getContrat } from "../services/contratService";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaArrowLeft, FaSave, FaFileContract, FaUser, FaCalendarAlt, FaCheckCircle, FaIdCard } from "react-icons/fa";
import "./ModifierContrat.css";

function ModifierContrat() {
  const { id_contrat } = useParams();
  const [form, setForm] = useState({ 
    matricule: "", 
    type_contrat: "", 
    date_debut: "", 
    date_fin: "", 
    statut: "" 
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadContrat = async () => {
      try {
        const data = await getContrat(id_contrat);
        if (data.success) setForm(data.contrat);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        alert("Erreur lors du chargement du contrat");
      } finally {
        setInitialLoading(false);
      }
    };
    loadContrat();
  }, [id_contrat]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateContrat({ ...form, id_contrat });
      navigate("/contrats");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de modifier le contrat");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="modifier-contrat-container">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Chargement du contrat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modifier-contrat-container">
      {/* Header Section */}
      <div className="contrat-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaFileContract />
          </div>
          <div className="header-text">
            <h1>Modifier le Contrat</h1>
            <p>Mettre à jour les informations du contrat</p>
          </div>
        </div>
      </div>

      <div className="contrat-form-content">
        <div className="form-container">
          {/* Carte du formulaire */}
          <div className="form-card">
            <div className="card-header">
              <button 
                className="btn-back"
                onClick={() => navigate("/contrats")}
              >
                <FaArrowLeft className="btn-icon" />
                Retour à la liste
              </button>
              <div className="form-title">
                <FaEdit className="title-icon" />
                <h2>Modifier le Contrat #{id_contrat}</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contrat-form">
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
                      type="text"
                      id="matricule"
                      name="matricule"
                      className="form-input"
                      value={form.matricule}
                      onChange={handleChange}
                      placeholder="Saisir le matricule"
                      required
                      disabled={loading}
                    />
                    <div className="form-hint">
                      Matricule de l'employé associé à ce contrat
                    </div>
                  </div>
                </div>

                {/* Section Contrat */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaFileContract className="section-icon" />
                    Détails du Contrat
                  </h3>

                  <div className="form-group">
                    <label htmlFor="type_contrat" className="form-label">
                      <FaFileContract className="input-icon" />
                      Type de contrat
                    </label>
                    <select
                      id="type_contrat"
                      name="type_contrat"
                      className="form-input"
                      value={form.type_contrat}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Sélectionner le type de contrat</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Interim">Intérim</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date_debut" className="form-label">
                        <FaCalendarAlt className="input-icon" />
                        Date de début
                      </label>
                      <input
                        type="date"
                        id="date_debut"
                        name="date_debut"
                        className="form-input"
                        value={form.date_debut}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="date_fin" className="form-label">
                        <FaCalendarAlt className="input-icon" />
                        Date de fin
                      </label>
                      <input
                        type="date"
                        id="date_fin"
                        name="date_fin"
                        className="form-input"
                        value={form.date_fin}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="statut" className="form-label">
                      <FaCheckCircle className="input-icon" />
                      Statut du contrat
                    </label>
                    <select
                      id="statut"
                      name="statut"
                      className="form-input"
                      value={form.statut}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Sélectionner le statut</option>
                      <option value="Actif">Actif</option>
                      <option value="En attente">En attente</option>
                      <option value="Terminé">Terminé</option>
                      <option value="Résilié">Résilié</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !form.matricule || !form.type_contrat || !form.date_debut || !form.date_fin || !form.statut}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Modification en cours...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Mettre à jour le Contrat
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/contrats")}
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
                  <strong>ID du contrat :</strong> {id_contrat}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifierContrat;