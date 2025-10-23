import React, { useState, useEffect } from "react";
import { addContrat } from "../services/contratService";
import { getEmployes } from "../services/employeService";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft, FaSave, FaFileContract, FaUser, FaCalendarAlt, FaCheckCircle, FaIdCard } from "react-icons/fa";
import "./AjouterContrat.css";

function AjouterContrat() {
  const [form, setForm] = useState({
    matricule: "",
    type_contrat: "",
    date_debut: "",
    date_fin: "",
    statut: "",
  });

  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Charger la liste des employés pour le datalist
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const data = await getEmployes();
        if (data.success) setEmployes(data.employes);
      } catch (error) {
        console.error("Erreur chargement employés :", error);
      }
    };
    fetchEmployes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.matricule) {
      alert("Veuillez saisir ou sélectionner un matricule !");
      setLoading(false);
      return;
    }

    try {
      const result = await addContrat(form);
      if (result.success) {
        navigate("/contrats");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Erreur ajout contrat :", error);
      alert("Impossible d'ajouter le contrat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-contrat-container">
      {/* Header Section */}
      <div className="contrat-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaFileContract />
          </div>
          <div className="header-text">
            <h1>Ajouter un Contrat</h1>
            <p>Créer un nouveau contrat pour un employé</p>
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
                <FaPlus className="title-icon" />
                <h2>Nouveau Contrat</h2>
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
                      {employes.map((e) => (
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
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Enregistrer le Contrat
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
                <div className="info-icon">💡</div>
                <div className="info-text">
                  <strong>Conseil :</strong> Assurez-vous que l'employé existe dans le système avant de créer son contrat
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📋</div>
                <div className="info-text">
                  <strong>Types de contrat :</strong> CDI (Contrat à Durée Indéterminée), CDD (Contrat à Durée Déterminée), Stage, Intérim, Freelance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterContrat;