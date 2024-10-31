export interface FileI {
  id?: number;
  user_id: number;
  file_name: string;
  file_path: string; // Chemin absolu ou relatif du fichier sur le disque
  file_size: number; // En octets
  uploaded_at?: Date;
}

export interface FileLinkI {
  id?: number;
  file_id: number;
  download_link: string; // Le lien de téléchargement généré
  expiration_date?: Date;
  created_at?: Date;
}

export interface FileRepositoryI {
  getAllFilesByUser: (user_id: number) => Promise<FileI[]>;
  getFile: (id: number) => Promise<FileI | null>;
  insertFile: (file: FileI) => Promise<FileI>;
  updateFile: (file: FileI) => Promise<FileI>;
  deleteFile: (id: number) => Promise<void>;
}

export interface FileLinkRepositoryI {
  getLinkByFileId: (file_id: number) => Promise<FileLinkI | null>;
  generateDownloadLink: (
    file_id: number,
    expiration_date?: Date
  ) => Promise<FileLinkI>;
  deleteLink: (id: number) => Promise<void>;
}
