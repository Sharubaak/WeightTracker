let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let weightModel = require('../models/weight'); // Renamed to avoid shadowing

/* Read Operation */
router.get('/', async (req, res, next) => {
    try {
        const weightList = await weightModel.find();  // Use weightList to avoid confusion
        res.render('weight/list', {
            title: 'Weight Tracker',
            weight: weightList,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Create Operation */
router.get('/add', async (req, res, next) => {
    try {
        res.render('weight/add', { title: 'Add Weight' });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/add', async (req, res, next) => {
    try {
        let newWeight = new weightModel({
            week: req.body.week,
            weight: req.body.weight,
            GoalReached: req.body.GoalReached,
            date: req.body.date,
        });
        await newWeight.save();  // Use .save() instead of .create() here
        res.redirect('/weight');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Update Operation */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const weightToEdit = await weightModel.findById(id);
        res.render('weight/edit', {
            title: 'Edit Weight',
            weight: weightToEdit,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedWeight = {
            week: req.body.week,
            weight: req.body.weight,
            GoalReached: req.body.GoalReached,
            date: req.body.date,
        };
        await weightModel.findByIdAndUpdate(id, updatedWeight);
        res.redirect('/weight');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await weightModel.deleteOne({ _id: id });
        res.redirect('/weight');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
