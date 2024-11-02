export const uploadFile = async (file: File, userId: number): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId.toString());

    const response = await fetch(`${import.meta.env.VITE_API}/files/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
