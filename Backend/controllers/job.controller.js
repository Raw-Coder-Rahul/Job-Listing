export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !companyId || !experience || !jobType || !position || location) {
            return res.status(400).json({ message: "Please fill all the fields", status: false });
        }

    } catch (error) {

    }
}