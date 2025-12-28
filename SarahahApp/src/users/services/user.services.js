import User from "../../DataBase/Models/users.model.js";
import { encrypt, decrypt } from "../../utils/encryption.utils.js";
import { hashSync, compareSync } from "bcrypt";

export const SignUpService = async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender, phoneNumber } = req.body;
        const isUserExist = await User.findOne({ $or: [{ email }, { firstName, lastName }] });
        if (isUserExist) {
            return res.status(400).json({ message: "User Already Exist" });
        }
        const encryptedphoneNumber = encrypt(phoneNumber);
        const hashedPassword = hashSync(password, 10);

        const data = await User.create({ firstName, lastName, email, password: hashedPassword, age, gender, phoneNumber: encryptedphoneNumber });
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"});
    }
}

export const UpdateUserService = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, age, gender } = req.body;
        const isUserExist = await User.findOne({ $or: [{ email }, { firstName, lastName }] });
        if (isUserExist) {
            return res.status(400).json({ message: "User Already Exist" });
        }
        const data = await User.updateOne({ _id: id }, { firstName, lastName, email, age, gender });
        if (!data.modifiedCount) {
            return res.status(400).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "User Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const DeleteUserService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findByIdAndDelete(id);
        if (!data) {
            return res.status(400).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const SignInService = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(400).json({ message: "Wrong Email Or Password" })
        }
        const isPasswordMatch = compareSync(password, data.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong Email Or Password" })
        }
        return res.status(200).json({ message: "Sign In Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const GetAllUsersService = async (req, res) => {
    try {
        let data = await User.find().select("-password");

        if (!data) {
            return res.status(400).json({ message: "No Users Found" });
        }

        data = data.map((user) => {
            return {
                ...user._doc,
                phoneNumber: decrypt(user.phoneNumber)
            }
        })

        return res.status(200).json({ message: "Users Found Successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error from GetAllUsersService", error: error.message });
    }
}

export const GetUserByIdService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findById(id).select("-password");
        if (!data) {
            return res.status(400).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "User Found Successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
