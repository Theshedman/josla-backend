const {Router} = require('express');
const path = require('path');
const Career = require('../models/career');

const filePath = path.join(__dirname, '../../uploads');
const router = Router();


router.route('/careers').post(async (req, res) => {
    // Check for the file upload.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No file is uploaded.');
    }

    const {cv} = req.files;

    const careerPath = path.join(filePath, cv.name);

    if (path.extname(cv.name) !== '.pdf') {
        return res.status(400).send('Error: not a .pdf file!');
    }

    cv.mv(careerPath, async (err) => {
        if (err) {
            return res.status(500).send('Invalid upload path!');
        }

        const {fullName, email, phone, position, coverLetter} = req.body;
        const careerData = {fullName, email, phone, position, coverLetter, cv: careerPath};
        const career = await new Career(careerData);
        await career.save();
        res.json({msg: `${cv.name}, successfully uploaded!`, career});
    });
})
    .get(async (req, res) => {
        const data = await Career.find({});
        res.send(data);
    });

router.route('/careers/:id').get(async (req, res) => {
    try {
        const {id} = req.params;
        const career = await Career.findById(id);
        if (!career) {
            return res.status(404).send('Not Found!');
        }

        res.json(career);
    } catch (e) {
        res.status(500).send(e);
    }
})
    .delete(async (req, res) => {
        try {
            const {id} = req.params;
            const career = await Career.findByIdAndDelete(id);
            if (!career) {
                return res.status(404).send('Not Found!');
            }
            res.send(career);
        } catch (e) {
            res.status(500).send(e);
        }
    });

module.exports = router;

