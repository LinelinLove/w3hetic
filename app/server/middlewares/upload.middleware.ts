import multer from 'multer';
import path from 'path';

// Configurer Multer pour stocker les fichiers dans un dossier spécifique
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single('file'); // Assurez-vous que le champ du fichier se nomme 'file' dans la requête
