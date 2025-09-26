
const express = require("express");
 const router = express.Router();
 const productController = require("../controllers/productController");
 const upload = require("../utils/uploader");

router.get("/all" , productController.getAllProduct);
router.get("/:id" , productController.getProductById);

router.post("/create" , upload.single("image") , productController.createProduct);
router.put("/update/:id" , upload.single("image") , productController.updateProduct);
router.delete("/delete/:id" , productController.deleteProduct);

module.exports = router;