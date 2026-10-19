# TechConnect — Site de Evento com Inscrições

Aplicação full-stack para divulgar um evento fictício de tecnologia, cadastrar participantes e permitir que a organização consulte e exclua inscrições.

## Tecnologias
- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Persistência: array em memória (conforme permitido no enunciado)
- Comunicação frontend/backend: Fetch API

> **Importante:** como os dados ficam em memória, as inscrições são apagadas quando o servidor é reiniciado. Para persistência permanente, seria necessário usar SQLite ou outro banco de dados.

## Requisitos
- Página principal do evento, com data, local, descrição e palestrantes
- Formulário de inscrição
- Página de inscritos com exclusão
- Rotas com React Router
- Validação de campos obrigatórios e bloqueio de e-mail duplicado
- Layout responsivo
- Endpoints `GET /inscricoes`, `POST /inscricoes` e `DELETE /inscricoes/:id`

## Pré-requisitos
Instale uma versão recente do Node.js (que inclua npm): https://nodejs.org/

## Como executar

Abra dois terminais no VS Code.

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
O servidor inicia em `http://localhost:3001`.

### 2. Frontend
No segundo terminal:
```bash
cd frontend
npm install
npm run dev
```
Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

## Testes manuais sugeridos
1. Abra a página inicial e clique em **Inscreva-se**.
2. Preencha nome, e-mail e tipo de ingresso; telefone é opcional.
3. Envie o formulário e confira a confirmação.
4. Tente cadastrar novamente o mesmo e-mail: deve aparecer uma mensagem de erro.
5. Abra **Inscritos**, confira a pessoa e teste a exclusão.
6. Redimensione a janela para verificar a adaptação a telas pequenas.

## Rotas do site
- `/` — página inicial
- `/inscricao` — formulário
- `/inscritos` — lista de inscritos

## API
- `GET /inscricoes` — lista inscrições
- `POST /inscricoes` — cria inscrição
- `DELETE /inscricoes/:id` — remove inscrição

Exemplo de corpo para `POST /inscricoes`:
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "(11) 99999-9999",
  "tipoIngresso": "estudante"
}
```

## Publicar no GitHub
Crie um repositório público no GitHub. Na pasta raiz do projeto, execute:
```bash
git init
git add .
git commit -m "Projeto inicial TechConnect"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```
Substitua `URL_DO_SEU_REPOSITORIO` pela URL do repositório que você criou no GitHub.
