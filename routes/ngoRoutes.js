const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ngoController = require("../controllers/ngoController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const multipleUploads = upload.fields([
  { name: "addressProof", maxCount: 1 },
  { name: "idProof", maxCount: 1 },
  { name: "selfiePhoto", maxCount: 1 },
  { name: "ngoProfile", maxCount: 1 },
]);

router.post("/register", multipleUploads, ngoController.registerNgo);
router.get("/all", ngoController.getAllNgos);
router.put("/status/:id", ngoController.updateStatus);

module.exports = router;