const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Product fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Produit.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newProduct = new Product({ name, price, stock, image: imagePath });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stock, price } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Si une nouvelle image est envoyée
    if (req.file) {
      // Supprime l'ancienne image si elle existe
      if (product.image) {
        const oldImagePath = path.join(__dirname, "../", product.image); // chemin relatif depuis le serveur
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      product.image = `/uploads/${req.file.filename}`; // met à jour avec la nouvelle image
    }

    // Met à jour les autres champs
    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Supprime l'image si elle existe
    if (product.image) {
      const oldImagePath = path.join(__dirname, "../", product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Supprime le produit de la base
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error); // pour voir le vrai message d'erreur
    res.status(500).json({ message: "Server error" });
  }
};
