import React, { useEffect, useState } from "react";
import { getConge, updateConge } from "../services/congeService";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaArrowLeft, FaSave, FaUmbrellaBeach, FaUser, FaCalendarAlt, FaIdCard } from "react-icons/fa";
import "./ModifierConge.css";

function ModifierConge() {
  const { id_conge } = useParams();
  const [form, setForm] = useState({
    matricule: "",
    date_debut: "",
    date_fin: "",
    type_conge: ""
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadConge = async () => {
      try {
        const data = await getConge(id_conge);
        if (data.success) setForm(data.conge);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        alert("Erreur lors du chargement du congé");
      } finally {
        setInitialLoading(false);
      }
    };
    loadConge();
  }, [id_conge]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateConge({ ...form, id_conge });
      navigate("/conges");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de modifier le congé");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="modifier-conge-container">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Chargement du congé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modifier-conge-container">
      {/* Header Section */}
      <div className="conge-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUmbrellaBeach />
          </div>
          <div className="header-text">
            <h1>Modifier le Congé</h1>
            <p>Mettre à jour les informations du congé</p>
          </div>
        </div>
      </div>

      <div className="conge-form-content">
        <div className="form-container">
          {/* Carte du formulaire */}
          <div className="form-card">
            <div className="card-header">
              <button 
                className="btn-back"
                onClick={() => navigate("/conges")}
              >
                <FaArrowLeft className="btn-icon" />
                Retour à la liste
              </button>
              <div className="form-title">
                <FaEdit className="title-icon" />
                <h2>Modifier le Congé #{id_conge}</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="conge-form">
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
                      Matricule de l'employé associé à ce congé
                    </div>
                  </div>
                </div>

                {/* Section Dates */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaCalendarAlt className="section-icon" />
                    Période du Congé
                  </h3>

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
                </div>

                {/* Section Type de congé */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaUmbrellaBeach className="section-icon" />
                    Type de Congé
                  </h3>

                  <div className="form-group">
                    <label htmlFor="type_conge" className="form-label">
                      <FaUmbrellaBeach className="input-icon" />
                      Type de congé
                    </label>
                    <select
                      id="type_conge"
                      name="type_conge"
                      className="form-input"
                      value={form.type_conge}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Sélectionner le type de congé</option>
                      <option value="Congé annuel">Congé annuel</option>
                      <option value="Congé maladie">Congé maladie</option>
                      <option value="Congé maternité">Congé maternité</option>
                      <option value="Congé paternité">Congé paternité</option>
                      <option value="Congé sans solde">Congé sans solde</option>
                      <option value="Congé exceptionnel">Congé exceptionnel</option>
                      <option value="RTT">RTT</option>
                    </select>
                    <div className="form-hint">
                      Sélectionnez le type de congé approprié
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !form.matricule || !form.date_debut || !form.date_fin || !form.type_conge}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Modification en cours...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Mettre à jour le Congé
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/conges")}
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
                  <strong>ID du congé :</strong> {id_conge}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifierConge;