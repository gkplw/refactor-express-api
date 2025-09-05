import * as productService from "../services/productService.js";

export async function getAllProducts(req, res) {
  try {
    const { keywords, category } = req.query;
    const products = await productService.getAllProducts({ keywords, category });
    const data = products.map(({ _id, name, price, image, description, category, created_at, modified_at }) => ({
      _id, name, price, image, description, category, created_at, modified_at
    }));
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const { _id, name, price, image, description, category, created_at, modified_at } = product;
    res.json({ data: { _id, name, price, image, description, category, created_at, modified_at } });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}

export async function createProduct(req, res) {
  try {
    // รับเฉพาะ field ที่ต้องการ
    const { name, price, image, description, category } = req.body;
    const result = await productService.createProduct({ name, price, image, description, category });
    const product = await productService.getProductById(result.insertedId);
    // ส่งกลับเฉพาะ field ที่ต้องการ
    res.status(201).json({
      data: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        created_at: product.created_at,
        modified_at: product.modified_at
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    // รับเฉพาะ field ที่ต้องการ
    const { name, price, image, description, category } = req.body;
    const updated = await productService.updateProduct(id, { name, price, image, description, category });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    const product = await productService.getProductById(id);
    // ส่งกลับเฉพาะ field ที่ต้องการ
    res.json({
      data: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        created_at: product.created_at,
        modified_at: product.modified_at
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: `Product record ${id} has been deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
}