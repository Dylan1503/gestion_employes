import React, { useEffect, useState } from "react";
import { getServices, deleteService } from "../services/serviceService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaBuilding } from "react-icons/fa";
import "./ListeService.css";

function ListeServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const handleDelete = async (service_id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
      try {
        await deleteService(service_id);
        loadServices();
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  const handleEdit = (service_id) => {
    navigate(`/services/modifier/${service_id}`);
  };

  return (
    <div className="liste-services-container">
      {/* Header Section */}
      <div className="services-header">
        <div className="header-content">
          <div className="header-icon">
            <FaBuilding />
          </div>
          <div className="header-text">
            <h1>Gestion des Services</h1>
            <p>Liste de tous les services de l'entreprise</p>
          </div>
        </div>
      </div>

      <div className="services-content">
        {/* Card Container */}
        <div className="services-card">
          {/* Header avec bouton */}
          <div className="card-header">
            <h2>Liste des Services</h2>
            <button
              className="btn-add-service"
              onClick={() => navigate("/services/ajouter")}
            >
              <FaPlus className="btn-icon" />
              Ajouter un service
            </button>
          </div>

          {/* Tableau */}
          <div className="table-container">
            <table className="services-table">
              <thead>
                <tr>
                  <th className="col-id">ID</th>
                  <th className="col-libelle">Libellé</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((s) => (
                    <tr key={s.id_service} className="service-row">
                      <td className="service-id">{s.id_service}</td>
                      <td className="service-libelle">{s.libelle}</td>
                      <td className="service-actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(s.id_service)}
                        >
                          <FaEdit className="btn-icon" />
                          Modifier
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(s.id_service)}
                        >
                          <FaTrash className="btn-icon" />
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-data">
                    <td colSpan="3">
                      <div className="no-data-content">
                        <FaBuilding className="no-data-icon" />
                        <p>Aucun service trouvé</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Statistiques */}
          <div className="services-stats">
            <div className="stat-item">
              <span className="stat-number">{services.length}</span>
              <span className="stat-label">Services au total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeServices;