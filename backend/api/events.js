const router = require('express').Router();
let Event = require('./event.model');

router.route('/').get((req,res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error in: ' + err))
})

router.route('/add').post((req, res) => {
    const desc = req.body.desc

    const newEvent = new Event({
        desc,
    })

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error in: ' + err))
})

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error in: ' + err))
})

router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted'))
        .catch(err => res.status(400).json('Error in: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Event.findByIdAndUpdate(req.params.id)
        .then(event => {
            event.desc = req.body.desc;

            event.save()
                .then(() => res.json('Event updated!'))
                .catch(err => res.status(400).json('Error in: ' + err))
        })
        .catch(err => res.status(400).json('Error in: ' + err))
})

module.exports = router;






