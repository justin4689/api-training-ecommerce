const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Chemin absolu vers le dossier uploads
const uploadDir = path.join(__dirname, "../uploads");

// Crée le dossier s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // utilise le chemin absolu
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtrage des fichiers (seulement images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées!"), false);
  }
};

// Export du middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
