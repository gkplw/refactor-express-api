import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const collection = db.collection("products");

export async function findProducts(query) {
  return collection.find(query).limit(10).toArray();
}

export async function findProductById(id) {
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function findProductByName(name) {
  return collection.findOne({ name });
}

export async function insertProduct(productData) {
  return collection.insertOne(productData);
}

export async function updateProduct(id, productData) {
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: productData }
  );
  return result.matchedCount > 0;
}

export async function deleteProduct(id) {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}