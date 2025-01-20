// 1.import multer
import multer from "multer";

//2. configuration of multer with destination and filename

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "_") + file.originalname);
  },
});

const uploads = multer({
  storage: storage,
});
export default uploads;
