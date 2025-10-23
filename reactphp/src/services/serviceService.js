const API_URL = "http://localhost/employe/backend/api/service/";

export async function getServices() {
  const response = await fetch(`${API_URL}liste.php`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des services");
  }
  return await response.json();
}

export async function addService(libelle) {
  const response = await fetch(`${API_URL}ajout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ libelle }),
  });
  return await response.json();
}

export async function deleteService(id_service) {
  const response = await fetch(`${API_URL}delete.php?id_service=${id_service}`, {
    method: "DELETE",
  });
  return await response.json();
}

 

export async function getService(id_service) {
  const response = await fetch(`${API_URL}getService.php?id_service=${id_service}`);
  if (!response.ok) throw new Error("Erreur lors du chargement du service");
  return await response.json();
}

export async function updateService(id_service, libelle) {
  const response = await fetch(`${API_URL}update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_service, libelle }),
  });
  return await response.json();
}


