import { Router } from "express";
const userController = Router();
import * as users from "./services/user.services.js";

userController.post("/signup", users.SignUpService);
userController.put("/update/:id", users.UpdateUserService);
userController.delete("/delete/:id", users.DeleteUserService);
userController.get("/getall", users.GetAllUsersService);
userController.get("/getuser/:id", users.GetUserByIdService);
userController.post("/signin", users.SignInService);


export default userController