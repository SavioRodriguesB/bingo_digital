const express = require("express");
const router = express.Router();

const AdminAuth = require("../middleware/AdminAuth")
const UserAuth = require("../middleware/UserAuth")

const UsuarioController = require("../usuario/controller")
const PessoaContatoController = require("../pessoa_contato/controller")
const PessoaEnderecoController = require("../pessoa_endereco/controller")
const PessoaChaveController = require("../pessoa_chave/controller");
const PessoaController = require("../pessoa/controller")
const SorteioController = require("../sorteio/controller")
const JogoController = require("../jogo/controller")
const CartelaController = require("../cartela/controller")

router.use("/usuario", UsuarioController);
router.use("/pessoa", UserAuth, PessoaController);
router.use("/pessoa", UserAuth, PessoaContatoController);
router.use("/pessoa", UserAuth, PessoaEnderecoController);
router.use("/pessoa", UserAuth, PessoaChaveController);
router.use("/cartela", UserAuth, CartelaController);

router.use("/sorteio", SorteioController);
router.use("/jogo", JogoController);

module.exports = router;