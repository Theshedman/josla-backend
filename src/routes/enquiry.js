const {Router} = require('express');
const Enquiry = require('../models/enquiry');

const router = Router();

router.route('/enquiries').get(async (req, res) => {
    try {
        const enquiry = await Enquiry.find({});
        if (!enquiry) {
            return res.status(404).send({msg: 'Not Found!'});
        }
        res.send(enquiry);
    } catch (e) {
        res.status(500).send(e);
    }
}).post(async (req, res) => {
    try {
        const data = req.body;
        const enquiry = await new Enquiry(data);
        await enquiry.save();
        res.send(enquiry);
    } catch (e) {
        res.status(401).send(e);
    }
});

router.route('/enquiries/:id').get(async (req, res) => {
    try {
        const {id} = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).send({msg: 'Not Found'});
        }

        res.json(enquiry);
    } catch (e) {
        res.status(500).send(e);
    }
}).delete(async (req, res) => {
    try {
        const {id} = req.params;
        const enquiry = await Enquiry.findByIdAndDelete(id);
        if (!enquiry) {
            return res.status(404).send('Not Found!');
        }
        res.send(enquiry);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
