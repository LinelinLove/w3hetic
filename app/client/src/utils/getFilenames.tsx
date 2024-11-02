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
