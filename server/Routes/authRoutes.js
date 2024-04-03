import { Registration, Login, Main,UpdateOrders,OwnerDetails,AdminViewUsers,AdminUserOrders,DeleteTrackDown,saveIssues,AdminIssues, GetUser,UpdateOrder,RemoveDishBucketList, UpdateUser,BucketList,Worker,ClearBucketList ,ReceivedOrders} from "../Controller/authController.js";
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
router.delete("/bucketlist/:dishName",authenticateUser,RemoveDishBucketList);
router.get("/deliveryorders",ReceivedOrders);
router .put("/orders",UpdateOrders);
router.get("/users",AdminViewUsers);
router.get("/admin/userorders",AdminUserOrders);
router.put("/deletetrackdown",authenticateUser,DeleteTrackDown);
router.put('/saveIssue', saveIssues);
router.get("/ownerDetails",OwnerDetails);
router.get("/adminissues",AdminIssues);
export default router;
