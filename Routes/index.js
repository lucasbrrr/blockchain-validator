const express = require("express");
const router = express.Router();

const connection = require("../src/connection");

router.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "Send a exam or retrieve by your CPF." });
});

router.post("/send", connection.createOrUpdateExam);
router.post("/checkExam", connection.retrieveExamByCpf);

module.exports = router;
