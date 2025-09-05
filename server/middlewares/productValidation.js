export function validateProduct(req, res, next) {
  const { name, price, image, description, category } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Product name is required and must be a non-empty string" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Product price is required and must be a number greater than 0" });
  }
  if (typeof image !== "string" || image.trim() === "") {
    return res.status(400).json({ message: "Product image is required and must be a non-empty string" });
  }
  if (typeof description !== "string" || description.trim() === "" || description.length < 10) {
    return res.status(400).json({ message: "Product description is required, must be a non-empty string, and at least 10 characters long" });
  }
  if (typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ message: "Product category is required and must be a non-empty string" });
  }

  next();
}