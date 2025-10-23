const API_URL = "http://localhost/employe/backend/api/employe/";

export async function getGraphEmployeByService() {
  try {
    const res = await fetch(`${API_URL}graphEmployeService.php`);
    const data = await res.json();

    // data contient déjà { success: true, data: [...] }
    return data;
  } catch (error) {
    console.error("Erreur GraphEmploye:", error);
    return { success: false, data: [] };
  }
}
