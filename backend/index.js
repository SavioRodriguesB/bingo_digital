const express = require("express");
const router = require("./routes/router");
var cors = require('cors');
require("dotenv-safe").config();

const IP = 'localhost'
const PORT = 5000

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

router.get("/", (req,res) => {
    res.sendStatus(200)
});

app.use("/", router);

app.listen(PORT, IP, () => {
    console.log(`Aplicação iniciada em: http://${IP}:${PORT}`);
})