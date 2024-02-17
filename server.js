import express from "express";
import path from "path";
import { imageGenerator } from "./src/imageGenerator.js";

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// Generate images
app.get("/generate-images", async (req, res) => {
  try {
    await imageGenerator();
    res.send({ status: "Images generated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Failed to generate images" });
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
