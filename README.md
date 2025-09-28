# 🐾 Find a Friend

API para conectar pets em busca de adoção com organizações e pessoas interessadas em adotar.

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Vitest** - Testes unitários e E2E
- **Docker** - Containerização do banco

## 📋 Funcionalidades

- ✅ Cadastro e autenticação de organizações
- ✅ Cadastro de pets para adoção
- ✅ Busca de pets por cidade
- ✅ Filtros por características (idade, energia, tamanho, independência)
- ✅ Visualização de detalhes do pet
- ✅ Refresh token para autenticação

## 🛠️ Instalação

### Pré-requisitos

- Node.js (versão 20+)
- Docker e Docker Compose
- Yarn

### Configuração

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd find-a-friend
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o banco de dados:

```bash
docker-compose up -d
```

5. Execute as migrações:

```bash
npx prisma migrate dev
```

6. Inicie o servidor:

```bash
yarn dev
```

A API estará disponível em `http://localhost:3080`

## 🧪 Testes

```bash
# Testes unitários
yarn test

# Testes E2E
yarn test:e2e

# Testes com watch
yarn test:watch

# Coverage
yarn test:coverage

# Interface visual dos testes
yarn test:ui
```

## 📚 Scripts Disponíveis

- `yarn dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Gera build de produção
- `yarn start` - Inicia servidor de produção
- `yarn test` - Executa testes unitários
- `yarn test:e2e` - Executa testes E2E
- `yarn test:watch` - Executa testes unitários em modo watch
- `yarn test:e2e:watch` - Executa testes E2E em modo watch
- `yarn test:coverage` - Executa testes com relatório de cobertura
- `yarn test:ui` - Interface visual dos testes
- `yarn lint` - Executa linting
- `yarn lint:fix` - Corrige problemas de linting

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. O schema inclui:

- **Organizations**: Organizações que cadastram pets
- **Pets**: Pets disponíveis para adoção

### Características dos Pets

- **Idade**: Filhote, Adulto, Idoso
- **Nível de Energia**: Baixa, Média, Alta
- **Tamanho**: Pequeno, Médio, Grande
- **Independência**: Baixa, Média, Alta

## 🔧 Estrutura do Projeto

```
src/
├── http/           # Controllers e rotas
├── use-cases/      # Regras de negócio
├── repositories/   # Acesso aos dados
├── lib/           # Configurações
└── utils/         # Utilitários
```

## 🚀 Deploy

1. Configure as variáveis de ambiente de produção
2. Execute o build:

```bash
yarn build
```

3. Inicie o servidor:

```bash
yarn start
```
