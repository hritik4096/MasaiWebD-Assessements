const express = require("express");
const router = express.Router();
const mongoose = require("../db");

const recipeSchema = new mongoose.Schema({
  recipe_id: Number,
  name: String,
  ingredients: [String],
  cuisine: String,
  prep_time: Number,
  difficulty: String,
  price: Number
});

const Recipe = mongoose.model("Recipe", recipeSchema);

router.post("/insert-sample", async (req, res) => {
  const data = [ /* sample data here (same as provided JSON) */ ];
  await Recipe.insertMany(data);
  res.json({ message: "Sample data inserted" });
});

router.get("/cuisine-italian", async (req, res) => {
  const result = await Recipe.find({ cuisine: "Italian" });
  res.json(result);
});

router.get("/prep-less-30", async (req, res) => {
  const result = await Recipe.find({ prep_time: { $lt: 30 } });
  res.json(result);
});

router.get("/price-gt-500", async (req, res) => {
  const result = await Recipe.find({ price: { $gt: 500 } });
  res.json(result);
});

router.get("/sort-price", async (req, res) => {
  const result = await Recipe.find().sort({ price: 1 });
  res.json(result);
});

router.put("/update-price", async (req, res) => {
  await Recipe.updateOne({ recipe_id: 2 }, { $set: { price: 900 } });
  res.json({ message: "Price updated for recipe_id 2" });
});

router.get("/name-price-only", async (req, res) => {
  const result = await Recipe.find({}, { name: 1, price: 1, _id: 0 });
  res.json(result);
});

router.get("/medium-price-lt-600", async (req, res) => {
  const result = await Recipe.find({ difficulty: "medium", price: { $lt: 600 } });
  res.json(result);
});

router.get("/sort-prep-desc", async (req, res) => {
  const result = await Recipe.find().sort({ prep_time: -1 });
  res.json(result);
});

router.post("/insert-new", async (req, res) => {
  const recipe = {
    recipe_id: 11,
    name: "Chocolate Cake",
    ingredients: ["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"],
    cuisine: "American",
    prep_time: 50,
    difficulty: "medium",
    price: 750
  };
  await Recipe.create(recipe);
  res.json({ message: "Chocolate Cake added" });
});

router.delete("/delete-caesar", async (req, res) => {
  await Recipe.deleteOne({ recipe_id: 4 });
  res.json({ message: "Caesar Salad deleted" });
});

router.get("/japanese-thai", async (req, res) => {
  const result = await Recipe.find({ cuisine: { $in: ["Japanese", "Thai"] } });
  res.json(result);
});

router.get("/includes-egg", async (req, res) => {
  const result = await Recipe.find({ ingredients: "Egg" });
  res.json(result);
});

router.put("/update-padthai-prep", async (req, res) => {
  await Recipe.updateOne({ recipe_id: 7 }, { $set: { prep_time: 35 } });
  res.json({ message: "Pad Thai prep_time updated" });
});

router.delete("/delete-price-gt-1000", async (req, res) => {
  await Recipe.deleteMany({ price: { $gt: 1000 } });
  res.json({ message: "Recipes with price > 1000 deleted" });
});

router.get("/limit-3", async (req, res) => {
  const result = await Recipe.find().limit(3);
  res.json(result);
});

router.get("/skip-2", async (req, res) => {
  const result = await Recipe.find().skip(2);
  res.json(result);
});

router.get("/thai-sort-price-desc", async (req, res) => {
  const result = await Recipe.find({ cuisine: "Thai" }).sort({ price: -1 });
  res.json(result);
});

router.post("/insert-hummus", async (req, res) => {
  const hummus = {
    recipe_id: 12,
    name: "Hummus",
    ingredients: ["Chickpeas", "Tahini", "Garlic", "Olive Oil", "Lemon Juice"],
    cuisine: "Middle Eastern",
    prep_time: 15,
    difficulty: "easy",
    price: 300
  };
  await Recipe.create(hummus);
  res.json({ message: "Hummus added" });
});

router.get("/count-easy", async (req, res) => {
  const count = await Recipe.countDocuments({ difficulty: "easy" });
  res.json({ count });
});

router.get("/prep-gt-40", async (req, res) => {
  const result = await Recipe.find({ prep_time: { $gt: 40 } });
  res.json(result);
});

module.exports = router;
