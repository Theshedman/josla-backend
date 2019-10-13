const {Router} = require('express');
const path = require('path');
const Resume = require('../models/resume');

const filePath = path.join(__dirname, '../../uploads');
const router = Router();


router.route('/resumes').post(async (req, res) => {
    // Check for the file upload.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No file is uploaded.');
    }

    const {cv} = req.files;

    const resumePath = path.join(filePath, cv.name);

    if (path.extname(cv.name) !== '.pdf') {
        return res.status(400).send('Error: not a .pdf file!');
    }

    cv.mv(resumePath, async (err) => {
        if (err) {
            return res.status(500).send('Invalid upload path!');
        }

        const {fullName, email, aboutYou, portfolio} = req.body;
        const resumeData = {fullName, email, aboutYou, cv: resumePath, portfolio};
        const resume = await new Resume(resumeData);
        await resume.save();
        res.json({msg: `${cv.name}, successfully uploaded!`, resume});
    });
})
    .get(async (req, res) => {
        const data = await Resume.find({});
        res.send(data);
    });

router.route('/resumes/:id').get(async (req, res) => {
    try {
        const {id} = req.params;
        const resume = await Resume.findById(id);
        if (!resume) {
            return res.status(404).send('Not Found!');
        }

        res.json(resume);
    } catch (e) {
        res.status(500).send(e);
    }
})
    .delete(async (req, res) => {
        try {
            const {id} = req.params;
            const resume = await Resume.findByIdAndDelete(id);
            if (!resume) {
                return res.status(404).send('Not Found!');
            }
            res.send(resume);
        } catch (e) {
            res.status(500).send(e);
        }
    });

module.exports = router;
