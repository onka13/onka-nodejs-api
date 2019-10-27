import express from "express";
const router = express.Router();

router.get("/get", function(req, res, next) {
	res.send("response " + req.baseUrl + "" + req.url);
});

export default router;
