import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Register new user
export const register = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, password, role } = req.body;
  
      if (!fullname || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
          message: "All fields are required",
          success: false,
        });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 🔥 Add file path if uploaded
      const profilePhoto = req.file ? `/uploads/${req.file.filename}` : "";
  
      await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
          profilePhoto,
          bio: "",
          skills: [],
          resume: "",
          resumeOriginalName: ""
        }
      });
  
      return res.status(201).json({
        message: "Account created successfully.",
        success: true,
      });
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  };
  


  export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (user.role !== role) {
            return res.status(403).json({
                message: "Account doesn't exist with this role.",
                success: false,
            });
        }

        if (!process.env.SECRET_KEY) {
            return res.status(500).json({
                message: "Server configuration error",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        // Generate full profile photo URL
        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const profilePhotoUrl = user.profile?.profilePhoto.startsWith("/")
          ? `${baseUrl}${user.profile.profilePhoto}`
          : `${baseUrl}/uploads/${user.profile.profilePhoto}`;
        
      
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back, ${user.fullname}`,
                success: true,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: {
                        ...user.profile._doc,
                        skills: user.profile.skills || [],
                        bio: user.profile.bio || "",
                        resume: user.profile.resume || "",
                        profilePhoto: profilePhotoUrl,
                    },
                },
            });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        console.log(" Incoming update request:");
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);

        const { fullname, email, phoneNumber, skills } = req.body;
        const userId = req.id; 
        console.log(" User ID from token:", userId);

        const user = await User.findById(userId);
        if (!user) {
            console.warn(" User not found with ID:", userId);
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Basic fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Bio update
        if (req.body.bio) {
            user.profile.bio = req.body.bio;
        }

        //  Profile photo upload
        if (req.files?.profile?.[0]) {
            const profileFile = req.files.profile[0];
            console.log(" Profile image uploaded:", profileFile.originalname);
            user.profile.profilePhoto = `/uploads/${profileFile.filename}`;
            user.profile.profilePhotoOriginalName = profileFile.originalname || "";
        }

        //  Resume upload
        if (req.files?.file?.[0]) {
            const resumeFile = req.files.file[0];
            console.log(" Resume uploaded:", resumeFile.originalname);
            user.profile.resume = `/uploads/${resumeFile.filename}`;
            user.profile.resumeOriginalName = resumeFile.originalname || "";
        }

        //  Skills update
        if (skills) {
            const parsedSkills = skills.split(',').map(skill => skill.trim());
            console.log(" Skills parsed:", parsedSkills);
            user.profile.skills = parsedSkills;
        }

        await user.save();
        console.log("Profile updated successfully for:", user.email);

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                skills: user.profile.skills,
                role: user.role,
                resume: user.profile.resume,
                resumeOriginalName: user.profile.resumeOriginalName,
                bio: user.profile.bio,
                profile: user.profile,
            }
        });

    } catch (error) {
        console.error(" Update profile error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
