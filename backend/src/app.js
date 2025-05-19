import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import route from "./routes/route.js";


// src
dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            process.env.CUS_FRONTEND_URL,
            process.env.ADM_FRONTEND_URL,
            process.env.SEL_FRONTEND_URL,
        ],
    })
);

// const checkPermission = (req, res, next) => {
//     // Try and catch
//     next(); // call the next function after this func
// };



// app.get("/sys-config", (req, res) => {
//     const query = "SELECT * FROM sys_config";

//     pool.query(query)
//         .then(([rows]) => {
//             if (rows && rows.length > 0) {
//                 res.json(rows);
//             } else {
//                 res.status(404).json({ message: "No configurations found" });
//             }
//         })
//         .catch((err) => {
//             console.error("Database query error:", err.message);
//             res.status(500).json({ message: "Internal Server Error" });
//         });
// });

// app.get("/love", (req, res) => {
//     const query = "select * from sys_config";

//     pool.query(query).then(([rows]) => {
//         res.send(rows);
//     });
// });

// Router
// const router = express.Router();
// router.get("/crush/sys", checkPermission, sys_config);

// router.get("api/all", checkPermission, get_all);
// router.get("api/by_id", checkPermission, get_by_id);
// router.post("api/post", checkPermission, createAccount);
// router.put("api/put", checkPermission, updateAccount);
// router.delete("api/delete", checkPermission, deleteAccount);

// Controller
// const sys_config = async (req, res) => {
//     //
//     await pool
//         .query(query)
//         .then(([rows]) => {
//             if (rows && rows.length > 0) {
//                 res.json(rows);
//             } else {
//                 res.status(404).json({ message: "No configurations found" });
//             }
//         })
//         .catch((err) => {
//             console.error("Database query error:", err.message);
//             res.status(500).json({ message: "Internal Server Error" });
//         });
// };

// app.use("/", Home);
app.use("/api", route);

// Start server
export const viteNodeApp = app;
