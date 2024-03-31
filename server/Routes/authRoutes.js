import { Registration, Login, Main, GetUser,UpdateOrder,RemoveDishBucketList, UpdateUser,BucketList,Worker,ClearBucketList } from "../Controller/authController.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/register", Registration);

router.post("/login", Login,authenticateUser);
router.get("/restaurants", Main);
router.get("/user", authenticateUser, GetUser);
router.put("/update/edit/:id",UpdateUser);
router.post("/bucketlist",authenticateUser,BucketList)
router .post("/order",UpdateOrder);
router.post("/worker",Worker);
router.post("/clear",authenticateUser,ClearBucketList)
router.delete("/bucketlist/:dishName",authenticateUser,RemoveDishBucketList)


export default router;
