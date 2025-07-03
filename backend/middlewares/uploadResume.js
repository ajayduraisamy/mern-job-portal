// middlewares/uploadResume.js
import multer from "multer";
import path from "path";

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `resume-${Date.now()}${ext}`);
  },
});

export const uploadResume = multer({ storage: resumeStorage });
export const singleResumeUpload = uploadResume.single("resume");