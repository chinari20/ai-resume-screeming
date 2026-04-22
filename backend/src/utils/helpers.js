export const slugifyText = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const uniqueNormalizedStrings = (values = []) =>
  [...new Set(values.map((item) => String(item).trim()).filter(Boolean))];

export const parseYearsFromText = (text = "") => {
  const matches = text.match(/(\d+)\+?\s+years?/i);
  return matches ? Number(matches[1]) : 0;
};

export const extractEmail = (text = "") =>
  text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)?.[0] || "";

export const extractPhone = (text = "") =>
  text.match(/(\+?\d[\d\s-]{8,}\d)/)?.[0] || "";

export const normalizeSkill = (skill = "") => skill.trim().toLowerCase();
