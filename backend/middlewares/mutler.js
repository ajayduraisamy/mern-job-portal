// middlewares/multer.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});


export const uploadProfile = multer({ storage });
export const singleUpload = uploadProfile.single("file");
export const multiUpload = uploadProfile.fields([
  { name: "file", maxCount: 1 },    
  { name: "profile", maxCount: 1 }   
]);
