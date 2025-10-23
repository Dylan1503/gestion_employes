const API_URL = "http://localhost/employe/backend/api/absence";

export async function getAbsences() {
  const res = await fetch(`${API_URL}/liste.php`);
  return await res.json();
}

export async function getAbsence(id_abs) {
  const res = await fetch(`${API_URL}/getAbsence.php?id_abs=${id_abs}`);
  return await res.json();
}

export async function addAbsence(absence) {
  const res = await fetch(`${API_URL}/ajout.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(absence),
  });
  return await res.json();
}

export async function updateAbsence(absence) {
  const res = await fetch(`${API_URL}/update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(absence),
  });
  return await res.json();
}

export async function deleteAbsence(id_abs) {
  const res = await fetch(`${API_URL}/delete.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_abs }),
  });
  return await res.json();
}
export const searchAbsenceByDate = async (start, end) => {
  try {
    const res = await fetch(`http://localhost/employe/backend/api/absence/searchAbsenceByDate.php?start=${start}&end=${end}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur recherche par date :", err);
    return { success: false, absences: [] };
  }
};