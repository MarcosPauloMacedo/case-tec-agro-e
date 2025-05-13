# 🧪 Avaliação Técnica – Desenvolvedor Front-End

Este repositório contém a solução para a avaliação técnica proposta pela empresa **Agro-e**. O projeto tem como objetivo demonstrar habilidades com React, Django, testes, autenticação, estilização responsiva, gerenciamento de estado global e boas práticas de desenvolvimento front-end e back-end.

---

## 📋 Requisitos Atendidos

### ✅ React – Lista de Produtos
- [x] Tabela com colunas: Nome, Preço, Ações
- [x] Exclusão de produtos da lista
- [x] Adição de novos produtos
- [x] Uso de `useState` e `useEffect` para controle de estado

### ✅ Back-End com Django
- [x] API REST com Django REST Framework
- [x] CRUD de produtos (`name`, `price`)
- [x] Validações nos campos
- [x] Testes unitários da API

### ✅ Testes Front-End
- [x] Testes com Jest e Testing Library:
  - Renderização correta da tabela
  - Exclusão de produtos
  - Adição de produtos

### ✅ Autenticação com JWT
- [x] Login com geração de token JWT
- [x] Acesso às rotas da API restrito a usuários autenticados

### ✅ Estilização Responsiva
- [x] Interface responsiva utilizando TailwindCSS ou Bootstrap

### ✅ Redux Toolkit
- [x] Gerenciamento global de estado com Redux Toolkit

### ✅ Cache no Back-End
- [x] Implementado cache de 10 minutos para o endpoint `/api/products`
- [x] Explicação da invalidação do cache ao atualizar produtos

### ✅ Otimização de Performance
- [x] Lista virtualizada com React Window para renderização eficiente

### ✅ Monitoramento e Logs
- [x] Integração com sistema de logs (ex.: Sentry ou ELK)
- [x] Estratégia de monitoramento de falhas

### ✅ Deploy com Docker
- [x] Containerização do front-end e back-end
- [x] `docker-compose` configurado
- [x] Instruções de execução local e produção

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Python 3.10+

### Rodar com Docker
```bash
docker-compose up --build
```

Acesse:
- Front-end: http://localhost:3000
- Back-end (API): http://localhost:8000/api/products

---

## 🧪 Rodar Testes

### Front-end
```bash
cd frontend
npm install
npm run test
```

### Back-end
```bash
cd backend
pip install -r requirements.txt
python manage.py test
```

---

## 📄 Decisões Técnicas

- **React com Vite**: para performance otimizada
- **Redux Toolkit**: simplifica o gerenciamento de estado
- **DRF + JWT**: estrutura moderna e segura de API REST
- **TailwindCSS**: facilita responsividade e personalização visual
- **React Window**: melhora performance em grandes listas
- **Docker**: facilita portabilidade e deploy

---

## 👨‍💻 Autor

Desenvolvido por Marcos Paulo Avelino Macedo.