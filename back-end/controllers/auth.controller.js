import userTable from "../models/auth.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const sign_up = async (req, res) => {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        const existingUser = await userTable.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userTable({
            userName,
            email,
            password: hashedPassword,
            role: role.toLowerCase()
        });

        const savedUser = await newUser.save();

        // Remove password from response
        const { password: pass, ...userWithoutPassword } = savedUser._doc;

        return res.status(201).json({
            success: true,
            message: "Sign up successful",
            data: userWithoutPassword
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const sign_in = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const user = await userTable.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Remove password from response
        const { password: pass, ...userWithoutPassword } = user._doc;

        return res.status(200).json({
            success: true,
            message: "Sign in successful",
            data: userWithoutPassword,
            token: token  // Optional: send token in response too
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const update_account = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    if (updates.password) {
        try {
            updates.password = await bcrypt.hash(updates.password, 10);
        } catch (hashError) {
            return res.status(500).json({
                success: false,
                message: "Error hashing password"
            });
        }
    }

    try {
        const updatedUser = await userTable.findByIdAndUpdate(
            userId,
            updates,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { password, ...userData } = updatedUser._doc;
        return res.status(200).json({
            success: true,
            message: "Account updated successfully",
            data: userData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const delete_account = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await userTable.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};