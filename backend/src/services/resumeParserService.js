import fs from "fs/promises";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import {
  extractEmail,
  extractPhone,
  parseYearsFromText,
  uniqueNormalizedStrings,
} from "../utils/helpers.js";

const KNOWN_SKILLS = [
  "react",
  "node.js",
  "node",
  "express",
  "mongodb",
  "javascript",
  "typescript",
  "tailwind css",
  "aws",
  "docker",
  "kubernetes",
  "python",
  "java",
  "sql",
  "git",
  "rest api",
  "next.js",
  "redux",
  "html",
  "css",
];

export const parseResumeFile = async (file) => {
  const buffer = await fs.readFile(file.path);
  let text = "";

  if (file.mimetype === "application/pdf") {
    const data = await pdf(buffer);
    text = data.text;
  } else {
    const { value } = await mammoth.extractRawText({ buffer });
    text = value;
  }

  const lowerText = text.toLowerCase();
  const extractedSkills = KNOWN_SKILLS.filter((skill) => lowerText.includes(skill.toLowerCase()));
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  return {
    extractedText: text,
    extractedName: lines[0] || file.originalname.split(".")[0],
    extractedEmail: extractEmail(text),
    extractedPhone: extractPhone(text),
    extractedSkills: uniqueNormalizedStrings(extractedSkills),
    extractedEducation: lines.filter((line) =>
      /(b\.?tech|bachelor|master|mba|mca|bca|phd|degree)/i.test(line)
    ),
    extractedExperienceYears: parseYearsFromText(text),
  };
};
