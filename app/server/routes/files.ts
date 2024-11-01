import { Router, Request, Response } from 'express';
import { FileController } from '../controllers/file.controller'; // Contrôleur pour la gestion des fichiers
import { FileRepository } from '../repository/file.repository'; // Dépôt pour la gestion des fichiers
import {uploadMiddleware} from '../middlewares/upload.middleware'

const fileRepository = new FileRepository(); // Initialise le FileRepository
const fileController = new FileController(fileRepository);
const router = Router();

// Route pour l'upload de fichier
router.post('/upload', uploadMiddleware, async (req: Request, res: Response) => {
    try {
        await fileController.upload(req, res);
    } catch (error) {
        console.error('Error in upload route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route pour générer un lien de téléchargement
router.post('/generate-link', async (req: Request, res: Response) => {
    try {
        await fileController.generateDownloadLink(req, res);
    } catch (error) {
        console.error('Error in generate download link route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route pour télécharger un fichier via un lien
router.get('/download/:token', async (req: Request, res: Response) => {
    try {
        await fileController.download(req, res);
    } catch (error) {
        console.error('Error in download route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;