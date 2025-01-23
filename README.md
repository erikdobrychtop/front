# **React CRUD Front-End**

Este é o front-end do sistema **CRUD de Posts e Tags**, desenvolvido com **React** e **TailwindCSS**, para consumo de uma API Laravel. Ele inclui funcionalidades como **login**, **registro de usuários**, e gerenciamento de **Posts** e **Tags**.

## **Funcionalidades**

- Registro de novos usuários.
- Login com autenticação via token JWT.
- Gerenciamento de **Posts**:
  - Criar, listar, editar e excluir posts.
  - Associar múltiplas tags a um post.
- Gerenciamento de **Tags**:
  - Criar, listar, editar e excluir tags.

---

## **Requisitos**

- **Node.js**: v16 ou superior.
- **npm**: v8 ou superior.

---

## **Instalação**

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

## **Instale as Dependências:**

1. **npm install**

2. **Configure o TailwindCSS: Certifique-se de que o Tailwind está configurado no projeto (já configurado neste repositório).**

## **Inicie o Servidor de Desenvolvimento:**
1. **npm run dev**

2. **Acesse o Front-End no Navegador: O projeto será executado em http://localhost:5173 por padrão.**

## **Configuração**
1. **Este front-end consome uma API Laravel. Certifique-se de que a API está configurada e rodando corretamente.**

2. **A URL padrão da API é: http://localhost:8009/api.**
3. **Atualize os endpoints se necessário nos arquivos que usam axios.**


## **Estrutura de Diretórios**
src/
├── components/           # Componentes reutilizáveis
├── views/                # Telas (Login, Register, Posts, Tags)
├── routes.jsx            # Configuração das rotas do React Router
├── App.jsx               # Componente principal
├── main.jsx              # Entrada principal do React
├── index.css             # Estilos globais

## **Dependências Principais**
1. **React: Biblioteca para criação de interfaces.**
2. **React Router: Gerenciamento de rotas.**
3. **Axios: Para realizar requisições HTTP.**
4. **TailwindCSS: Framework de CSS para estilização moderna e responsiva**

## **Endpoints Principais da API**

**Autenticação**

1. **POST /api/login: Realizar login.**
2. **POST /api/register: Registrar um novo usuário.**

**Posts**

1. **GET /api/posts: Listar posts.**
2. **POST /api/posts: Criar um novo post.**
3. **PUT /api/posts/{id}: Atualizar um post.**
4. **DELETE /api/posts/{id}: Excluir um post.**

**Tags**

1. **GET /api/tags: Listar tags.**
2. **POST /api/tags: Criar uma nova tag.**
3. **PUT /api/tags/{id}: Atualizar uma tag.**
4. **DELETE /api/tags/{id}: Excluir uma tag.**