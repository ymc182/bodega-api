import express from "express";
import bodega from "./bodega.js";
const app = express();

// Path: index.js
app.use("/bodega", bodega);

app.get("/", (req, res) => {
	res.send(`Server is running. Time checked: ${Date.now()}`);
});

app.listen(process.env.PORT || 5001, () => {
	console.log(`"Server is running on port ${process.env.PORT || 5001}"`);
});
