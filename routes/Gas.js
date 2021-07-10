const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const gas = require('../controller/Gas.js')

var storage = multer.diskStorage({
    filename: function(req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function(req, file, cb) {
        cb(null)
    }
})

var upload = multer({storage: storage}).single('data')

router.post("/input", upload, (req, res) => {
    gas.inputDataGas(req.body, req.filename)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datagas", (req, res) => {
    gas.lihatDataGas()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datagas/:id", (req, res) => {
    gas.lihatDetailDataGas(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
    gas.hapusgas(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
let fileName;
if (req.body) {
    fileName = req.body.data;
}else {
    fileName = req.file.filename;
}

    gas.updateGas(req.params.id, req.body, fileName)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
 
})

module.exports = router