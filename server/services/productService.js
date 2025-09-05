import * as productRepository from "../repositories/productRepository.js";

export async function getAllProducts({ keywords, category }) {
  const query = {};
  if (keywords) query.name = new RegExp(keywords, "i");
  if (category) query.category = new RegExp(category, "i");
  return productRepository.findProducts(query);
}

export async function getProductById(id) {
  return productRepository.findProductById(id);
}

export async function createProduct(productData) {
  // เตรียมข้อมูลเพิ่ม created_at
  const data = { ...productData, created_at: new Date() };
  return productRepository.insertProduct(data);
}

export async function updateProduct(id, productData) {
  // ตรวจสอบ business rule ตัวอย่าง: ชื่อซ้ำ (ยกเว้นตัวเอง)
  if (productData?.name) {
    const exists = await productRepository.findProducts({ name: productData.name });
    if (exists.some((p) => String(p._id) !== String(id))) {
      throw new Error("Product name already exists");
    }
  }
  // เตรียมข้อมูลเพิ่ม modified_at
  const data = { ...productData, modified_at: new Date() };
  return productRepository.updateProduct(id, data);
}

export async function deleteProduct(id) {
  return productRepository.deleteProduct(id);
}