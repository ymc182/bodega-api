import express from "express";
import { CONTRACT_ID, NODE_URL } from "./config.js";
import { parseResult, viewQueryCreator } from "./helper.js";
const router = express.Router();
import fetch from "node-fetch";
/* router.use(function timeLog(req, res, next) {
	console.log("request received at: ", Date.now().toLocaleString());
	next();
}); */
router.get("/market/:id", async function (req, res) {
	try {
		if (req.params.id) {
			const methodName = "get_trait_market_data_by_id";
			const data = await (
				await fetch(
					NODE_URL,
					viewQueryCreator(CONTRACT_ID, methodName, {
						trait_id: req.params.id,
					})
				)
			).json();
			if (data.result.result) res.json(parseResult(data));
			else res.status(500).json(data.result);
		} else {
			res.status(400).send("Invalid Id");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error: " + err.message);
	}
});
router.get("/market", async function (req, res) {
	try {
		//get_trait_market_data
		const methodName = "get_trait_market_data";
		const data = await (await fetch(NODE_URL, viewQueryCreator(CONTRACT_ID, methodName, {}))).json();

		if (data.result.result) res.json(parseResult(data));
		else res.status(500).json(data.result);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error: " + err.message);
	}
});
// Define the about route
router.get("/traits/:id", async function (req, res) {
	try {
		if (req.params.id) {
			const methodName = "traits_by_id";
			const data = await (
				await fetch(
					NODE_URL,
					viewQueryCreator(CONTRACT_ID, methodName, {
						trait_id: req.params.id,
					})
				)
			).json();
			res.json(parseResult(data));
		} else {
			res.status(400).send("Invalid Id");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error: " + err.message);
	}
});
router.get("/traits", async function (req, res) {
	try {
		const limit = req.query.limit ? req.query.limit : 50;
		const offset = req.query.offset ? req.query.offset : 0;
		const methodName = "traits";
		const data = await (
			await fetch(
				NODE_URL,
				viewQueryCreator(CONTRACT_ID, methodName, {
					limit: parseInt(limit),
					from_index: parseInt(offset),
				})
			)
		).json();
		if (data.result.result) res.json(parseResult(data));
		else res.status(500).json(data.result);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error: " + err.message);
	}
});
router.get("/owner/:accountId", async function (req, res) {
	try {
		if (!req.params.accountId) res.status(400).send("Invalid Account Id");
		const methodName = "get_owner";
		const data = await (
			await fetch(
				NODE_URL,
				viewQueryCreator(CONTRACT_ID, methodName, {
					account_id: req.params.accountId,
				})
			)
		).json();
		if (data.result.result) res.json(parseResult(data));
		else res.status(500).json(data.result);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error: " + err.message);
	}
});
export default router;
