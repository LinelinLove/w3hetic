import { Request, Response } from 'express';
import { FileRepositoryI } from '../types/file.d'; // Assure-toi que le type est bien défini
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FileController {
    private fileRepository: FileRepositoryI;

    constructor(fileRepository: FileRepositoryI) {
        this.fileRepository = fileRepository;
    }

    // Méthode pour l'upload de fichiers
    async upload(req: Request, res: Response) {
        try {
            const { user_id } = req.body;
            const file = req.file; // Nécessite un middleware comme multer pour gérer l'upload

            if (!file || !user_id) {
                return res.status(400).json({ message: 'User ID and file are required.' });
            }

            // Définir le chemin et les infos du fichier
            const filePath = path.join(__dirname, '../uploads', file.filename);
            const fileRecord = await this.fileRepository.insertFile({
                user_id,
                file_name: file.originalname,
                file_path: filePath,
                file_size: file.size
            });

            res.status(201).json({ message: 'File uploaded successfully', file: fileRecord });
        } catch (error) {
            console.error('Error in file upload:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Méthode pour générer un lien de téléchargement
    async generateDownloadLink(req: Request, res: Response) {
        try {
            const { file_id, expirationDate } = req.body; // Assurez-vous que la structure est correcte
    
            if (!file_id) {
                return res.status(400).json({ message: 'File ID is required.' });
            }
    
            const file = await this.fileRepository.getFile(file_id);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
    
            // Générer le lien
            const linkRecord = await this.fileRepository.generateDownloadLink(file_id, expirationDate);            res.status(201).json({ message: 'Download link generated', link: linkRecord });
        } catch (error) {
            console.error('Error generating download link:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    // // Méthode pour télécharger un fichier via un lien sécurisé
    // async download(req: Request, res: Response) {
    //     try {
    //         const { token } = req.params;

    //         const link = await this.fileRepository.getDownloadLink(token);
    //         if (!link || (link.expiration_date && new Date(link.expiration_date) < new Date())) {
    //             return res.status(404).json({ message: 'Download link expired or not found' });
    //         }

    //         const file = await this.fileRepository.getOne(link.file_id);
    //         if (!file) {
    //             return res.status(404).json({ message: 'File not found' });
    //         }

    //         res.download(file.file_path, file.file_name);
    //     } catch (error) {
    //         console.error('Error in file download:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }
}
