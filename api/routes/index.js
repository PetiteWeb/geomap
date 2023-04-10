const router = require("express").Router();
const D = require("../models/divisions");

router.get("/divisions/show/:type", async (q,s) => {
    try {
        const divisions = await D.find({type: q.params.type}).select("-__v");
        s.status(200).json(divisions);
    } catch(e) {
        s.status(400).json({"message": e});
    }
});
router.get("/types", async (q,s) => {
    try {
        let types = await D.find().distinct("type");
        s.status(200).json(types);
    } catch(e) {
        s.status(400).json({"message": e});
    }
});

router.post("/divisions/add", async (q,s) => {
    try {
        await new D(q.body).save();
        s.status(200).json({"message": "ok"});
    } catch(e) {
        s.status(400).json({"message": e});
    }
});
router.patch("/divisions/update/:id", async (q,s) => {
    try {
        await DD.updateOne({"_id": q.params.id}, q.body);
        s.status(200).json({"message": "ok"});
    } catch(e) {
        s.status(400).json({"message": e});
    }
});
router.delete("/divisions/delete/:id", async (q,s) => {
    try {
        let div = await D.findOneAndDelete({"_id": q.params.id});
        if (cat) {
            s.status(200).json({"message": `ok`});
        } else {
            s.status(400).json({"message": `данных с id «${q.params.id}» не существует`});
        }
    } catch(e) {
        s.status(400).json({"message": e});
    }
});

module.exports = router;