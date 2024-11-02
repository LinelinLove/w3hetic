export const getFilenames = async (userId: number): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/user/files/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.totalUploadSize || [];
  } catch (error) {
    console.error("Error fetching filenames:", error);
    throw error;
  }
};

export const deleteFile = async (fileId) => {
  const url = `${import.meta.env.VITE_API}/files/${fileId}`;
  console.log("Sending DELETE request to:", url); // Log l'URL
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Essaye de récupérer le message d'erreur
      throw new Error(
        `Failed to delete: ${response.statusText} - ${errorResponse.message}`
      );
    }

    return await response.json(); // Renvoie la réponse en JSON
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
