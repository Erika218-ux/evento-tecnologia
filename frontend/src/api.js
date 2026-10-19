const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function tratarResposta(response) {
  const dados = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(dados.mensagem || "Não foi possível concluir a operação.");
  }
  return dados;
}

export async function listarInscricoes() {
  const response = await fetch(`${API_URL}/inscricoes`);
  return tratarResposta(response);
}

export async function criarInscricao(dados) {
  const response = await fetch(`${API_URL}/inscricoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  return tratarResposta(response);
}

export async function excluirInscricao(id) {
  const response = await fetch(`${API_URL}/inscricoes/${id}`, {
    method: "DELETE"
  });
  return tratarResposta(response);
}
