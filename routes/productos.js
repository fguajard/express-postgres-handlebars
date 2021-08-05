const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  changeProduct,
  deleteProduct,
} = require("../db/consultas");

router.get("/", async (req, res) => {
  try {
    const productos = await getProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const data = Object.values(body);
    const productoAgregado = await addProducts(data);
    res.status(201).json(productoAgregado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const data = Object.values(body);
    const { id } = req.params;
    const productoModificado = await changeProduct(data, id);
    res.status(200).json(productoModificado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await deleteProduct(id);
    res.status(200).json(productoEliminado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
