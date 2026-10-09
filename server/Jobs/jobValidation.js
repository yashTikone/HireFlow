const validateJob = (req, res, next) => {

    const {
        title,
        description,
        company,
        location,
        employmentType,
        salary,
        skills,
        experienceRequired
    } = req.body;

    // Required fields only for creating a job
    if (req.method === 'POST') {

        if (!title || typeof title !== 'string') {
            return res.status(400).json({
                message: 'Title is required and must be a string'
            });
        }

        if (!description || typeof description !== 'string') {
            return res.status(400).json({
                message: 'Description is required and must be a string'
            });
        }

        if (!company || typeof company !== 'string') {
            return res.status(400).json({
                message: 'Company is required and must be a string'
            });
        }

        if (!location || typeof location !== 'string') {
            return res.status(400).json({
                message: 'Location is required and must be a string'
            });
        }

        if (!employmentType || typeof employmentType !== 'string') {
            return res.status(400).json({
                message: 'Employment type is required and must be a string'
            });
        }

        if (!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                message: 'Skills are required and must be an array'
            });
        }
    }

    // Title
    if (title !== undefined) {

        if (typeof title !== 'string') {
            return res.status(400).json({
                message: 'Title must be a string'
            });
        }

        if (title.length > 100) {
            return res.status(400).json({
                message: 'Title must not exceed 100 characters'
            });
        }
    }

    // Description
    if (description !== undefined) {

        if (typeof description !== 'string') {
            return res.status(400).json({
                message: 'Description must be a string'
            });
        }

        if (description.length > 2000) {
            return res.status(400).json({
                message: 'Description must not exceed 2000 characters'
            });
        }
    }

    // Company
    if (company !== undefined) {

        if (typeof company !== 'string') {
            return res.status(400).json({
                message: 'Company must be a string'
            });
        }

        if (company.length > 100) {
            return res.status(400).json({
                message: 'Company must not exceed 100 characters'
            });
        }
    }

    // Location
    if (location !== undefined) {

        if (typeof location !== 'string') {
            return res.status(400).json({
                message: 'Location must be a string'
            });
        }

        if (location.length > 100) {
            return res.status(400).json({
                message: 'Location must not exceed 100 characters'
            });
        }
    }

    // Employment Type
    if (employmentType !== undefined) {

        if (typeof employmentType !== 'string') {
            return res.status(400).json({
                message: 'Employment type must be a string'
            });
        }

        const validEmploymentTypes = [
            'Full-time',
            'Part-time',
            'Internship'
        ];

        if (!validEmploymentTypes.includes(employmentType)) {
            return res.status(400).json({
                message: 'Invalid employment type'
            });
        }
    }

    // Salary
    if (salary !== undefined) {

        if (typeof salary !== 'string') {
            return res.status(400).json({
                message: 'Salary must be a string'
            });
        }

        if (salary.length > 100) {
            return res.status(400).json({
                message: 'Salary must not exceed 100 characters'
            });
        }
    }

    // Skills
    if (skills !== undefined) {

        if (!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                message: 'Skills must be a non-empty array'
            });
        }

        for (const skill of skills) {

            if (typeof skill !== 'string') {
                return res.status(400).json({
                    message: 'Each skill must be a string'
                });
            }

            if (skill.length > 50) {
                return res.status(400).json({
                    message: 'Each skill must not exceed 50 characters'
                });
            }
        }
    }

    // Experience
    if (experienceRequired !== undefined) {

        if (
            typeof experienceRequired !== 'number' ||
            experienceRequired < 0
        ) {
            return res.status(400).json({
                message: 'Experience required must be a non-negative number'
            });
        }
    }

    next();
};

module.exports = validateJob;