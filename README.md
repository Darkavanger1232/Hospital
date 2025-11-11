# Clínica Médica Completa — Projeto para GitHub Pages (frontend) + API Node/Express

Este repositório contém um frontend React (pronto para publicar no GitHub Pages) e um backend Node/Express (API) com banco SQLite para desenvolvimento.

**Importante:** o GitHub Pages só serve conteúdo estático (frontend). O backend precisa ser hospedado em um serviço com Node.js (Render, Railway, Heroku, etc.).

Estrutura principal fornecida:
- frontend/  (React + Vite)
- backend/   (Node + Express + SQLite)
- migrations/schema.sql
- README com instruções básicas

## Passos rápidos (local)
1. Backend:
   - cd backend
   - npm install
   - node ./scripts/init_db.js   (cria `data/clinica.db` e aplica schema)
   - npm run dev  (ou `npm start`)
2. Frontend:
   - cd frontend
   - npm install
   - npm run dev  (desenvolvimento) ou npm run build + npm run deploy (gh-pages)

## Observações
- Substitua variáveis de ambiente (JWT_SECRET, etc.) em produção.
- Para integração com sistemas do SUS (RNDS/CNS/CNES) é necessário seguir políticas oficiais e obter credenciais.
