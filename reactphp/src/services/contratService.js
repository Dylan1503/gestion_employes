const API_URL = "http://localhost/employe/backend/api/contrat/"; 
// ⚠️ adapte le chemin exact vers ton dossier api

// Liste de tous les contrats
export async function getContrats() {
  const res = await fetch(`${API_URL}/liste.php`);
  return await res.json();
}

// Un contrat par ID
export async function getContrat(id) {
  const res = await fetch(`${API_URL}/getContrat.php?id_contrat=${id}`);
  return await res.json();
}

// Ajouter
export async function addContrat(contrat) {
  const res = await fetch(`${API_URL}/ajout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contrat),
  });
  return await res.json();
}

// Modifier
export async function updateContrat(contrat) {
  const res = await fetch(`${API_URL}/update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contrat),
  });
  return await res.json();
}

// Supprimer
export async function deleteContrat(id_contrat) {
  const response = await fetch(`${API_URL}delete.php?id_contrat=${id_contrat}`, {
    method: "DELETE"
  });
  return await response.json();
}





export const searchContratsByMatricule = async (matricule) => {
  const res = await fetch(`${API_URL}/searchContrat.php?matricule=${matricule}`);
  return res.json();
};
