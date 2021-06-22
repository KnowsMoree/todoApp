const router = require("express").Router();
let Event = require("./event.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./pict/");
    },
    filename: function (req, file, cb) {
        let ext;
        switch (file.mimetype) {
            case "image/jpeg":
                ext = ".jpg";
                break;
            case "image/png":
                ext = ".png";
                break;
            default:
                break;
        }
        cb(null, "EventImg - " + Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
}).single("file");

router.route("/").get((req, res) => {
    Event.find()
        .then((events) => res.json(events))
        .catch((err) => res.status(400).json("Error in: " + err));
});

router.route("/add").post((req, res) => {
    upload(req, res, (err) => {
        const desc = req.body.desc;
        const file = req.file ? req.file.filename : "";

        const newEvent = new Event({
            desc,
            file,
        });

        newEvent
            .save()
            .then(() => res.json("Event added!"))
            .catch((err) => res.status(400).json("Error in: " + err));
    });
});

router.route("/:id").get((req, res) => {
    Event.findById(req.params.id)
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json("Error in: " + err));
});

router.route("/:id/img").get((req, res, next) => {
    Event.findById(req.params.id)
        .then((event) =>
            res.sendFile(process.cwd() + "/pict/" + event.file, (e) => {
                if (e) {
                    next(e);
                }
            })
        )
        .catch((err) => res.status(400).json("Error in: " + path.dirname));
});

router.route("/:id").delete((req, res) => {
    Event.findById(req.params.id) 
        .then((event) => {
            const path = process.cwd() + "/pict/" + event.file;
            fs.unlinkSync(path);

            Event.findByIdAndDelete(req.params.id)
                .then(() => res.json("Event deleted"))
                .catch((err) => res.status(400).json("Error in: " + err));
        })
        .catch((err) => res.status(400).json("Error in: " + path.dirname))
});

router.route("/update/:id").post((req, res) => {
    upload(req, res, (err) => {
        const desc = req.body.desc;
        const file = req.file ? req.file.filename : req.body.file;

        Event.findById(req.params.id)
            .then((event) => {
                event.desc = desc;
                event.file = file;

                event
                    .save()
                    .then(() => res.json("Event updated!"))
                    .catch((err) => res.status(400).json("Error in: " + err));
            })
            .catch((err) => res.status(400).json("Error in: " + err));
    })
});

module.exports = router;



