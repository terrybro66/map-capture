import { imageGenerator } from "./imageGenerator.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  //secret stuff here
});

async function uploadImages() {
  try {
    // Generate images
    const images = await imageGenerator();

    // Upload images to Cloudinary
    for (const image of images) {
      cloudinary.v2.uploader.upload(image, function (error, result) {
        if (error) console.error("Upload error:", error);
        else console.log("Upload result:", result);
      });
    }

    console.log("Images generated and uploaded successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

uploadImages();
