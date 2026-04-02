import { normalizeSkill } from "../utils/helpers.js";

const tokenize = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);

const keywordSimilarity = (resumeText = "", jobText = "") => {
  const resumeTokens = new Set(tokenize(resumeText));
  const jobTokens = tokenize(jobText);
  if (!jobTokens.length) return 0;
  const common = jobTokens.filter((token) => resumeTokens.has(token)).length;
  return Math.min(100, Math.round((common / jobTokens.length) * 100));
};

const scoreEducation = (candidateEducation = [], requirement = "") => {
  if (!requirement) return 100;
  const merged = candidateEducation.join(" ").toLowerCase();
  return merged.includes(requirement.toLowerCase()) ? 100 : 45;
};

const buildRecommendation = (score) => {
  if (score >= 80) return "Highly Suitable";
  if (score >= 55) return "Moderately Suitable";
  return "Not Suitable";
};

export const scoreApplication = ({ job, resume, profile }) => {
  const requiredSkills = (job.requiredSkills || []).map(normalizeSkill);
  const candidateSkills = [
    ...(profile?.skills || []).map(normalizeSkill),
    ...(resume?.extractedSkills || []).map(normalizeSkill),
  ];
  const uniqueCandidateSkills = [...new Set(candidateSkills)];

  const matchedSkills = requiredSkills.filter((skill) => uniqueCandidateSkills.includes(skill));
  const missingSkills = requiredSkills.filter((skill) => !uniqueCandidateSkills.includes(skill));
  const skillsRatio = requiredSkills.length ? matchedSkills.length / requiredSkills.length : 1;
  const skillsScore = Math.round(skillsRatio * 100);

  const candidateYears =
    resume?.extractedExperienceYears ||
    profile?.totalExperienceYears ||
    (profile?.experience || []).reduce((sum, item) => sum + (item.years || 0), 0);
  const requiredYears = Number(job.minimumExperience || 0);
  const experienceScore = requiredYears === 0 ? 100 : Math.min(100, Math.round((candidateYears / requiredYears) * 100));

  const educationScore = scoreEducation(
    resume?.extractedEducation?.length ? resume.extractedEducation : (profile?.education || []).map((item) => item.degree),
    job.educationRequirement
  );
  const keywordScore = keywordSimilarity(resume?.extractedText || profile?.summary || "", job.jobDescription);

  const finalScore = Math.round(
    skillsScore * 0.4 +
      experienceScore * 0.25 +
      educationScore * 0.15 +
      keywordScore * 0.2
  );

  const strengths = [];
  if (matchedSkills.length) strengths.push(`Matched ${matchedSkills.length} required skill(s)`);
  if (candidateYears >= requiredYears) strengths.push(`Experience meets or exceeds ${requiredYears} year requirement`);
  if (educationScore >= 90) strengths.push("Education aligns with role expectations");
  if (keywordScore >= 65) strengths.push("Resume language aligns closely with the job description");

  const summary = `This candidate matches ${matchedSkills.length}/${requiredSkills.length || matchedSkills.length} required skills, has ${candidateYears || 0} years of experience, and ${missingSkills.length ? `is missing ${missingSkills.slice(0, 4).join(", ")}` : "shows no major skill gaps"}.`;

  return {
    score: finalScore,
    scoreBreakdown: {
      skillsScore,
      experienceScore,
      educationScore,
      keywordScore,
    },
    matchedSkills,
    missingSkills,
    strengths,
    summary,
    recommendation: buildRecommendation(finalScore),
  };
};
