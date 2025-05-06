import express from "express";

const router = express.Router();

const showRouter = (req, res) => {
	res.send("Welcome to the API main route");
};

router.get("/", showRouter)

// Routes


export default router;