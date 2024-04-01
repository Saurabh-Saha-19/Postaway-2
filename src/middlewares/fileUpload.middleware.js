import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },

  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
  },
});

const uploadFile = multer({ storage: storageConfig });
export default uploadFile;
