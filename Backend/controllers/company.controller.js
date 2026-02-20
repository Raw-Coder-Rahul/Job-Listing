import { Company } from "../models/company.model.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required "});
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: "Company already exists" });
        }
        
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
    } catch (error) {
        console.error(error);
    }
};