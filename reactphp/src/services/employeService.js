const API_URL = "http://localhost/employe/backend/api/employe/";

// Liste de tous les employés
export async function getEmployes() {
  const res = await fetch(`${API_URL}liste.php`);
  return await res.json();
}

// Un employé par matricule
export async function getEmploye(matricule) {
  const res = await fetch(`${API_URL}getEmploye.php?matricule=${matricule}`);
  return await res.json();
}

// Ajouter un employé
export async function addEmploye(employe) {
  const res = await fetch(`${API_URL}ajout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employe),
  });
  return await res.json();
}

// Modifier un employé
export async function updateEmploye(employe) {
  const res = await fetch(`${API_URL}update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employe),
  });
  return await res.json();
}

// Supprimer un employé
export async function deleteEmploye(matricule) {
  const res = await fetch(`${API_URL}delete.php?matricule=${matricule}`, {
    method: "DELETE",
  });
  return await res.json();
}
// employeService.js
export const searchEmployes = async (query) => {
  try {
    const res = await fetch(`http://localhost/employe/backend/api/employe/searchEmploye.php?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur recherche employés :", err);
    return { success: false, employes: [] };
  }
};
export const searchEmployeByDate = async (start, end) => {
  try {
    const res = await fetch(`http://localhost/employe/backend/api/employe/searchEmployeByDate.php?start=${start}&end=${end}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur recherche par date :", err);
    return { success: false, employes: [] };
  }
};
export const getServices = async () => {
  try {
    const res = await fetch("http://localhost/employe/backend/api/service/getServices.php");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur récupération services :", err);
    return { success: false, services: [] };
  }
};

export const searchEmployeByService = async (id_service) => {
  try {
    const res = await fetch(
      `http://localhost/employe/backend/api/employe/filterByService.php?id_service=${id_service}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur recherche employé par service :", err);
    return { success: false, employes: [] };
  }
};



