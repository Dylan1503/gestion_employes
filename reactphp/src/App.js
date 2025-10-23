import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './composant/Header';
import Accueil from './pages/Accueil';

// Services
import ListeServices from './pages/listeService';
import AjouterService from './pages/ajoutService';
import ModifierService from './pages/modifierService';

// Contrats
import ListeContrats from './pages/listeContrat';
import AjouterContrat from './pages/ajoutContrat';
import ModifierContrat from './pages/modifierContrat';

// Employés
import ListeEmploye from './pages/listeEmploye';
import AjouterEmploye from './pages/ajoutEmploye';
import ModifierEmploye from './pages/modifierEmploye';

// Congés
import ListeConges from './pages/listeConge';
import AjouterConge from './pages/ajoutConge';
import ModifierConge from './pages/modifierConge';

// Absences
import ListeAbsence from './pages/listeAbsence';
import AjouterAbsence from './pages/ajoutAbsence';
import ModifierAbsence from './pages/modifierAbsence';

function App() {
  return (
    <>
      <Header />

      <div className="container mt-4">
        <Routes>
          {/* Accueil */}
          <Route path="/" element={<Accueil />} />

          {/* Services */}
          <Route path="/services" element={<ListeServices />} />
          <Route path="/services/ajouter" element={<AjouterService />} />
          <Route path="/services/modifier/:id_service" element={<ModifierService />} />

          {/* Contrats */}
          <Route path="/contrats" element={<ListeContrats />} />
          <Route path="/contrats/ajouter" element={<AjouterContrat />} />
          <Route path="/contrats/modifier/:id_contrat" element={<ModifierContrat />} />

          {/* Employés */}
          <Route path="/employes" element={<ListeEmploye />} />
          <Route path="/employes/ajouter" element={<AjouterEmploye />} />
          <Route path="/employes/modifier/:matricule" element={<ModifierEmploye />} />

          {/* Congés */}
          <Route path="/conges" element={<ListeConges />} />
          <Route path="/conges/ajouter" element={<AjouterConge />} />
          <Route path="/conges/modifier/:id_conge" element={<ModifierConge />} />

          {/* Absences */}
          <Route path="/absences" element={<ListeAbsence />} />
          <Route path="/absences/ajouter" element={<AjouterAbsence />} />
          <Route path="/absences/modifier/:id_abs" element={<ModifierAbsence />} />

          {/* Route 404 */}
          <Route path="*" element={<h2>Page non trouvée</h2>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
