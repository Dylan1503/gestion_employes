const API_URL = "http://localhost/employe/backend/api/conge"; 
// 🔹 adapte ce chemin selon ton organisation

// Récupérer tous les congés
export async function getConges() {
  const response = await fetch(`${API_URL}/liste.php`);
  return await response.json();
}

// Récupérer un congé par son ID
export async function getConge(id_conge) {
  const response = await fetch(`${API_URL}/getConge.php?id_conge=${id_conge}`);
  return await response.json();
}

// Ajouter un congé
export async function addConge(conge) {
  const response = await fetch(`${API_URL}/ajout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conge),
  });
  return await response.json();
}

// Modifier un congé
export async function updateConge(conge) {
  const response = await fetch(`${API_URL}/update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conge),
  });
  return await response.json();
}

// Supprimer un congé
export async function deleteConge(id_conge) {
  const response = await fetch(`${API_URL}/delete.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_conge }),
  });
  return await response.json();
}





export const searchCongesByDate = async (start, end) => {
  const res = await fetch(`${API_URL}/getCongesByDate.php?start=${start}&end=${end}`);
  return res.json();
};
export const searchCongesByMatricule = async (matricule) => {
  const res = await fetch(`${API_URL}/getCongesByMatricule.php?matricule=${matricule}`);
  return res.json();
};
