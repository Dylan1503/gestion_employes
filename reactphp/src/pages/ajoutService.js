import React, { useState } from "react";
import { addService } from "../services/serviceService";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft, FaSave, FaBuilding } from "react-icons/fa";
import "./AjoutService.css";

function AjouterService() {
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addService(libelle);
      navigate("/services"); // retour à la liste
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible d'ajouter le service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-service-container">
      {/* Header Section */}
      <div className="service-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaBuilding />
          </div>
          <div className="header-text">
            <h1>Ajouter un Service</h1>
            <p>Créer un nouveau service dans le système</p>
          </div>
        </div>
      </div>

      <div className="service-form-content">
        <div className="form-container">
          {/* Carte du formulaire */}
          <div className="form-card">
            <div className="card-header">
              <button 
                className="btn-back"
                onClick={() => navigate("/services")}
              >
                <FaArrowLeft className="btn-icon" />
                Retour à la liste
              </button>
              <div className="form-title">
                <FaPlus className="title-icon" />
                <h2>Nouveau Service</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="service-form">
              <div className="form-group">
                <label htmlFor="libelle" className="form-label">
                  Libellé du Service
                </label>
                <input
                  type="text"
                  id="libelle"
                  className="form-input"
                  value={libelle}
                  onChange={(e) => setLibelle(e.target.value)}
                  placeholder="Entrez le nom du service"
                  required
                  disabled={loading}
                />
                <div className="form-hint">
                  Saisissez le nom complet du service (ex: Ressources Humaines, Informatique, etc.)
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !libelle.trim()}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Enregistrer le Service
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/services")}
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
                  <strong>Conseil :</strong> Utilisez un nom clair et descriptif pour le service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterService;