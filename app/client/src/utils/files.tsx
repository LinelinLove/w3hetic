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

export const deleteFile = async (fileId: number) => {
  const url = `${import.meta.env.VITE_API}/files/${fileId}`;
  console.log("Sending DELETE request to:", url);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        `Failed to delete: ${response.statusText} - ${errorResponse.message}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const generateLink = async (fileId: number): Promise<any> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/files/generate-link`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_id: fileId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.link.download_link;
  } catch (error) {
    console.error("Error generating link:", error);
    throw error;
  }
};

export const downloadFile = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urlObject;
    link.download = url.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlObject);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
