import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const userId = req.userId;

    if (!companyName || !description) {
      return res.status(400).json({ message: "Company name and description are required", success: false });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: "Company already exists", success: false });
    }

    company = await Company.create({
      name: companyName,
      description,
      website,
      location,
      userId,
    });

    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Register company error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await Company.find({ userId });

    if (!companies.length) {
      return res.status(404).json({ message: "No companies found", success: false });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.error("Get all companies error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error("Get company by ID error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, website, description, location } = req.body;
    const companyId = req.params.id;

    const updateData = { name, website, description, location };

    const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ message: "Company updated successfully", company, success: true });
  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};