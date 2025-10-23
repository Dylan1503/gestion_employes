import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { getGraphEmployeByService } from "../services/graphServiceEmploye";

import { getEmployes } from "../services/employeService";
import { getServices } from "../services/serviceService";
import "./accueil.css";

function Accueil() {
  const [employesCount, setEmployesCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);
  

  const fetchCounts = async () => {
    // Nombre d'employés
    const empData = await getEmployes();
    if (empData.success) setEmployesCount(empData.employes.length);

    // Nombre de services
    const servData = await getServices();
    if (Array.isArray(servData)) setServicesCount(servData.length);
  };

  // Cartes de navigation
  const navigationCards = [
    {
      title: "Gestion des Services",
      description: "Gérez les services de l'entreprise",
      icon: "🏢",
      links: [
        { path: "/services", label: "Liste des Services" },
        { path: "/services/ajouter", label: "Ajouter un Service" }
      ],
      type: "service"
    },
    {
      title: "Gestion des Contrats",
      description: "Administrez les contrats des employés",
      icon: "📑",
      links: [
        { path: "/contrats", label: "Liste des Contrats" },
        { path: "/contrats/ajouter", label: "Ajouter un Contrat" }
      ],
      type: "contrat"
    },
    {
      title: "Gestion des Employés",
      description: "Managez le personnel de l'entreprise",
      icon: "👥",
      links: [
        { path: "/employes", label: "Liste des Employés" },
        { path: "/employes/ajouter", label: "Ajouter un Employé" }
      ],
      type: "employe"
    },
    {
      title: "Gestion des Congés",
      description: "Suivez les congés des employés",
      icon: "🌴",
      links: [
        { path: "/conges", label: "Liste des Congés" },
        { path: "/conges/ajouter", label: "Ajouter un Congé" }
      ],
      type: "conge"
    },
    {
      title: "Gestion des Absences",
      description: "Surveillez les absences du personnel",
      icon: "📊",
      links: [
        { path: "/absences", label: "Liste des Absences" },
        { path: "/absences/ajouter", label: "Ajouter une Absence" }
      ],
      type: "absence"
    }
  ];
  const [graphData, setGraphData] = useState([]);

useEffect(() => {
  fetchCounts();
  fetchGraphData();
}, []);

const fetchGraphData = async () => {
  const res = await getGraphEmployeByService();
  if (res.success) {
    setGraphData(res.data);
  }
};


  return (
    <div className="accueil-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Système de Gestion RH</h1>
          <p className="hero-subtitle">
            Gérez efficacement votre personnel, services, contrats et absences
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        {/* Section Statistiques */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card stat-card-employes">
              <div className="stat-content">
                <div className="stat-info">
                  <h3 className="stat-number">{employesCount}</h3>
                  <p className="stat-label">Employés</p>
                </div>
                <div className="stat-icon">👥</div>
              </div>
            </div>

            <div className="stat-card stat-card-services">
              <div className="stat-content">
                <div className="stat-info">
                  <h3 className="stat-number">{servicesCount}</h3>
                  <p className="stat-label">Services</p>
                </div>
                <div className="stat-icon">🏢</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="navigation-section">
          <h2 className="section-title">Modules de Gestion</h2>
          
          <div className="navigation-grid">
            {navigationCards.map((card, index) => (
              <div 
                key={index}
                className={`navigation-card card-${card.type}`}
              >
                <div className="card-header">
                  <span className="card-icon">{card.icon}</span>
                  <h3 className="card-title">{card.title}</h3>
                </div>
                
                <p className="card-description">{card.description}</p>
                
                <div className="card-links">
                  {card.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.path}
                      className="card-link"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
          {/* Section Graphique */}
          <div className="graph-section">
  <h2 className="section-title">Répartition des Employés par Service</h2>
  <div style={{ width: "100%", height: 400 }}>
    <ResponsiveContainer>
      <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="service" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>



        {/* Section Actions Rapides */}
        <div className="quick-actions-section">
          <h3 className="section-title">Actions Rapides</h3>
          <div className="quick-actions-grid">
            <Link
              to="/employes/ajouter"
              className="quick-action-btn action-employe"
            >
              Nouvel Employé
            </Link>
            <Link
              to="/services/ajouter"
              className="quick-action-btn action-service"
            >
              Nouveau Service
            </Link>
            <Link
              to="/conges/ajouter"
              className="quick-action-btn action-conge"
            >
              Demande de Congé
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;