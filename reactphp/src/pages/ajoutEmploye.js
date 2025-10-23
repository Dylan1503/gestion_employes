import React, { useState } from "react";
import { addEmploye } from "../services/employeService";
import { useNavigate } from "react-router-dom";
import {  FaArrowLeft, FaSave, FaUserPlus, FaIdCard, FaUser, FaVenusMars, FaBirthdayCake, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaMoneyBillAlt, FaBuilding } from "react-icons/fa";
import "./AjouterEmploye.css";

function AjouterEmploye() {
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    prenoms: "",
    sexe: "",
    date_naissance: "",
    adresse: "",
    telephone: "",
    email: "",
    date_embauche: "",
    salaire_base: "",
    id_service: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addEmploye(form);
      navigate("/employes");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible d'ajouter l'employé");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-employe-container">
      {/* Header Section */}
      <div className="employe-form-header">
        <div className="header-content">
          <div className="header-icon">
            <FaUserPlus />
          </div>
          <div className="header-text">
            <h1>Ajouter un Employé</h1>
            <p>Créer un nouveau profil employé dans le système</p>
          </div>
        </div>
      </div>

      <div className="employe-form-content">
        <div className="form-container">
          {/* Carte du formulaire */}
          <div className="form-card">
            <div className="card-header">
              <button 
                className="btn-back"
                onClick={() => navigate("/employes")}
              >
                <FaArrowLeft className="btn-icon" />
                Retour à la liste
              </button>
              <div className="form-title">
                <FaUserPlus className="title-icon" />
                <h2>Nouvel Employé</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="employe-form">
              <div className="form-grid">
                {/* Informations de base */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaIdCard className="section-icon" />
                    Informations de base
                  </h3>
                  
                  <div className="form-group">
                    <label htmlFor="matricule" className="form-label">
                      <FaIdCard className="input-icon" />
                      Matricule
                    </label>
                    <input
                      type="text"
                      id="matricule"
                      name="matricule"
                      className="form-input"
                      value={form.matricule}
                      onChange={handleChange}
                      placeholder="Ex: EMP001"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nom" className="form-label">
                        <FaUser className="input-icon" />
                        Nom
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        className="form-input"
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Nom de famille"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="prenoms" className="form-label">
                        <FaUser className="input-icon" />
                        Prénoms
                      </label>
                      <input
                        type="text"
                        id="prenoms"
                        name="prenoms"
                        className="form-input"
                        value={form.prenoms}
                        onChange={handleChange}
                        placeholder="Prénoms"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="sexe" className="form-label">
                        <FaVenusMars className="input-icon" />
                        Sexe
                      </label>
                      <select
                        id="sexe"
                        name="sexe"
                        className="form-input"
                        value={form.sexe}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      >
                        <option value="">Sélectionner le sexe</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="date_naissance" className="form-label">
                        <FaBirthdayCake className="input-icon" />
                        Date de Naissance
                      </label>
                      <input
                        type="date"
                        id="date_naissance"
                        name="date_naissance"
                        className="form-input"
                        value={form.date_naissance}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Informations de contact */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaMapMarkerAlt className="section-icon" />
                    Informations de contact
                  </h3>

                  <div className="form-group">
                    <label htmlFor="adresse" className="form-label">
                      <FaMapMarkerAlt className="input-icon" />
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="adresse"
                      name="adresse"
                      className="form-input"
                      value={form.adresse}
                      onChange={handleChange}
                      placeholder="Adresse complète"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telephone" className="form-label">
                        <FaPhone className="input-icon" />
                        Téléphone
                      </label>
                      <input
                        type="text"
                        id="telephone"
                        name="telephone"
                        className="form-input"
                        value={form.telephone}
                        onChange={handleChange}
                        placeholder="Numéro de téléphone"
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <FaEnvelope className="input-icon" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="adresse@email.com"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Informations professionnelles */}
                <div className="form-section">
                  <h3 className="section-title">
                    <FaBuilding className="section-icon" />
                    Informations professionnelles
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date_embauche" className="form-label">
                        <FaCalendarAlt className="input-icon" />
                        Date d'Embauche
                      </label>
                      <input
                        type="date"
                        id="date_embauche"
                        name="date_embauche"
                        className="form-input"
                        value={form.date_embauche}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="salaire_base" className="form-label">
                        <FaMoneyBillAlt className="input-icon" />
                        Salaire de Base
                      </label>
                      <input
                        type="number"
                        id="salaire_base"
                        name="salaire_base"
                        className="form-input"
                        value={form.salaire_base}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="id_service" className="form-label">
                      <FaBuilding className="input-icon" />
                      ID Service
                    </label>
                    <input
                      type="text"
                      id="id_service"
                      name="id_service"
                      className="form-input"
                      value={form.id_service}
                      onChange={handleChange}
                      placeholder="ID du service d'affectation"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !form.matricule || !form.nom || !form.prenoms || !form.sexe || !form.id_service}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <FaSave className="btn-icon" />
                      Enregistrer l'Employé
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate("/employes")}
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
                  <strong>Conseil :</strong> Remplissez tous les champs obligatoires marqués d'un astérisque implicite
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterEmploye;