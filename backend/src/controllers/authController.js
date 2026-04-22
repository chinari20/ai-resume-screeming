import User from "../models/User.js";
import CandidateProfile from "../models/CandidateProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import { generateToken } from "../services/tokenService.js";
import { USER_ROLES } from "../utils/constants.js";

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, companyName } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password, role });

    if (role === USER_ROLES.RECRUITER) {
      await RecruiterProfile.create({
        user: user._id,
        companyName: companyName || `${name} Talent`,
      });
    } else if (role === USER_ROLES.CANDIDATE) {
      await CandidateProfile.create({
        user: user._id,
        fullName: name,
        skills: [],
      });
    }

    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
