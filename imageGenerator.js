import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";
import * as d3 from "d3";

const GEOJSON_URL =
  "https://raw.githubusercontent.com/radoi90/housequest-data/master/london_boroughs.geojson";

async function imageGenerator() {
  const response = await fetch(GEOJSON_URL);
  const geojsonData = await response.json();

  geojsonData.features.forEach((feature, index) => {
    console.log(feature);
    const canvas = createCanvas(200, 280);
    const context = canvas.getContext("2d");

    const projection = d3.geoIdentity().fitSize([190, 270], feature);
    const d3Path = d3.geoPath(projection, context);

    // background
    context.fillStyle = "black";
    context.fillRect(0, 0, 0, 0);

    // polygon
    context.beginPath();
    d3Path(feature);
    context.fillStyle = "white";
    context.fill();

    // define path
    const dir = "./images";
    const filename = `${feature.properties.name}.png`;

    // Construct file path
    const filepath = path.join(dir, filename);

    // if dir doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const out = fs.createWriteStream(filepath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("success!!!"));
  });
}

imageGenerator().catch(console.error);
