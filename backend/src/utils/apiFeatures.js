export const buildJobQuery = (query) => {
  const filter = {};

  if (query.location) filter.location = new RegExp(query.location, "i");
  if (query.title) filter.title = new RegExp(query.title, "i");
  if (query.jobType) filter.jobType = query.jobType;
  if (query.status) filter.status = query.status;
  if (query.skills) {
    const skills = String(query.skills)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    filter.requiredSkills = { $in: skills.map((skill) => new RegExp(skill, "i")) };
  }

  return filter;
};
