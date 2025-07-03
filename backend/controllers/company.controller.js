import { Company } from "../models/company.model.js";

// Register Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Register company error:", error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Get Companies by Logged-in User
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Get companies error:", error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Get Company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("Get company by ID error:", error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Update Company (with optional logo upload)
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    if (!name || !description || !website || !location) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const updateData = { name, description, website, location };

    if (req.file) {
      // Save relative local path (e.g., /uploads/logo.jpg)
      updateData.logo = `/uploads/${req.file.filename}`;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Delete Company
export const deleteCompany = async (req, res) => {
  console.log("Received DELETE for company ID:", req.params.id);

  try {
    const companyId = req.params.id;
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Delete company error:", error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
