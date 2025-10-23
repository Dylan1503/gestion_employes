import React, { useState, useEffect } from "react";
import { addConge } from "../services/congeService";
import { getEmployes } from "../services/employeService";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft, FaSave, FaUmbrellaBeach, FaUser, FaCalendarAlt, FaIdCard, FaExclamationTriangle } from "react-icons/fa";
import "./AjouterConge.css";

function AjouterConge() {
  const [form, setForm] = useState({
    matricule: "",
    date_debut: "",
    date_fin: "",
    type_conge: ""
  });
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Charger la liste des employés pour le datalist
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const data = await getEmployes();
        if (data.success) setEmployes(data.employes);
      } catch (err) {
        console.error("Erreur chargement employés :", err);
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

    // Vérifier que le matricule existe
    if (!employes.some(emp => emp.matricule === form.matricule)) {
      setError("Le matricule saisi n'existe pas !");
      setLoading(false);
      return;
    }

    try {
      const result = await addConge(form);
      if (result.success) {
        navigate("/conges");
      } else {
        setError(result.error || "Erreur inconnue lors de l'ajout du congé");
      }
    } catch (err) {
      setError("Erreur réseau ou serveur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-conge-container">
      {/* Header Section */}
      <div className="conge-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUmbrellaBeach />
          </div>
          <div className="header-text">
            <h1>Ajouter un Congé</h1>
            <p>Enregistrer une nouvelle demande de congé</p>
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
                <FaPlus className="title-icon" />
                <h2>Nouvelle Demande de Congé</h2>
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
                      {employes.map(emp => (
                        <option key={emp.matricule} value={emp.matricule}>
                          {emp.nom} {emp.prenoms} ({emp.matricule})
                        </option>
                      ))}
                    </datalist>
                    <div className="form-hint">
                      Sélectionnez un employé existant dans la liste
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
                  disabled={loading || !form.matricule || !form.date_debut || !form.date_fin || !form.type_conge}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Enregistrer le Congé
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
                <div className="info-icon">💡</div>
                <div className="info-text">
                  <strong>Conseil :</strong> Vérifiez que les dates de congé ne chevauchent pas d'autres périodes de congé existantes
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📅</div>
                <div className="info-text">
                  <strong>Période :</strong> La date de fin doit être postérieure ou égale à la date de début
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterConge;