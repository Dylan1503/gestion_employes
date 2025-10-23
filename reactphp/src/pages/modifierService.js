import React, { useEffect, useState } from "react";
import { updateService, getService } from "../services/serviceService";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaArrowLeft, FaSave, FaBuilding } from "react-icons/fa";
import "./ModifierService.css";

function ModifierService() {
  const { id_service } = useParams();
  const [libelle, setLibelle] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  // Pré-remplir le formulaire
  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await getService(id_service);
        if (data.success) {
          setLibelle(data.service.libelle);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du service :", error);
        alert("Erreur lors du chargement du service");
      } finally {
        setInitialLoading(false);
      }
    };
    loadService();
  }, [id_service]);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateService(id_service, libelle);
      navigate("/services");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de modifier le service");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="modifier-service-container">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Chargement du service...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modifier-service-container">
      {/* Header Section */}
      <div className="service-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaBuilding />
          </div>
          <div className="header-text">
            <h1>Modifier le Service</h1>
            <p>Mettre à jour les informations du service</p>
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
                <FaEdit className="title-icon" />
                <h2>Modifier le Service #{id_service}</h2>
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
                  Modifiez le nom du service selon vos besoins
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
                      Modification en cours...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Mettre à jour le Service
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
                <div className="info-icon">📝</div>
                <div className="info-text">
                  <strong>Modification :</strong> Les changements seront appliqués immédiatement après la validation
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🆔</div>
                <div className="info-text">
                  <strong>ID du service :</strong> {id_service}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifierService;