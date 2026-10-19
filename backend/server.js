import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Persistência em memória, permitida pelo enunciado.
// Os dados são perdidos quando o servidor reinicia.
let inscricoes = [];
let proximoId = 1;

app.get("/", (_req, res) => {
  res.json({ mensagem: "API TechConnect funcionando." });
});

app.get("/inscricoes", (_req, res) => {
  res.json(inscricoes);
});

app.post("/inscricoes", (req, res) => {
  const nome = typeof req.body.nome === "string" ? req.body.nome.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const telefone = typeof req.body.telefone === "string" ? req.body.telefone.trim() : "";
  const tipoIngresso = req.body.tipoIngresso;

  if (!nome || !email || !tipoIngresso) {
    return res.status(400).json({
      mensagem: "Preencha os campos obrigatórios: nome, e-mail e tipo de ingresso."
    });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    return res.status(400).json({ mensagem: "Informe um e-mail válido." });
  }

  if (!["estudante", "profissional"].includes(tipoIngresso)) {
    return res.status(400).json({
      mensagem: "O tipo de ingresso deve ser estudante ou profissional."
    });
  }

  const emailJaCadastrado = inscricoes.some((inscricao) => inscricao.email === email);
  if (emailJaCadastrado) {
    return res.status(400).json({ mensagem: "Este e-mail já possui uma inscrição." });
  }

  const novaInscricao = {
    id: proximoId++,
    nome,
    email,
    telefone,
    tipoIngresso
  };

  inscricoes.push(novaInscricao);
  return res.status(201).json({
    mensagem: "Inscrição realizada com sucesso!",
    inscricao: novaInscricao
  });
});

app.delete("/inscricoes/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ mensagem: "Identificador de inscrição inválido." });
  }

  const indice = inscricoes.findIndex((inscricao) => inscricao.id === id);
  if (indice === -1) {
    return res.status(404).json({ mensagem: "Inscrição não encontrada." });
  }

  const [removida] = inscricoes.splice(indice, 1);
  return res.json({ mensagem: "Inscrição removida com sucesso.", inscricao: removida });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor." });
});

app.listen(PORT, () => {
  console.log(`API TechConnect rodando em http://localhost:${PORT}`);
});
