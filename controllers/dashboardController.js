const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Skill = require("../models/Skill");
const Experience = require("../models/Experience");

exports.getDashboardStats = async (req, res) => {
  try {
    const projects = await Project.countDocuments();
    const blogs = await Blog.countDocuments();
    const skills = await Skill.countDocuments();
    const experience = await Experience.countDocuments();

    res.json({
      projects,
      blogs,
      skills,
      experience,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
};
