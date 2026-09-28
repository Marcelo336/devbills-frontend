# DevBills Frontend

## 🚀 Visão Geral do Projeto

Este é o frontend do aplicativo de gestão financeira pessoal DevBills, desenvolvido com React, TypeScript e Tailwind CSS. Ele oferece uma interface intuitiva para que os usuários possam gerenciar suas receitas e despesas, visualizar seu saldo, acompanhar o histórico de transações e analisar seus gastos por categoria através de gráficos interativos.

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Login seguro via Google (Firebase Authentication).
- **Dashboard Interativo:** Visão geral do saldo, receitas e despesas.
- **Gráficos de Dados:** Gráfico de pizza para despesas por categoria e gráfico de barras para histórico mensal (usando Recharts).
- **Gestão de Transações:** Adicionar, visualizar, editar e excluir transações.
- **Filtros Avançados:** Filtragem de transações por período e categoria.
- **Responsividade:** Interface adaptável para diferentes tamanhos de tela (desktop e mobile).

## 🛠️ Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utility-first para estilos rápidos e customizáveis.
- **Vite:** Ferramenta de build de frontend rápida.
- **React Router DOM:** Para gerenciamento de rotas.
- **Recharts:** Biblioteca para criação de gráficos.
- **Firebase (Frontend):** Autenticação de usuários (Google Auth).
- **Axios:** Cliente HTTP para comunicação com a API.
- **React Toastify:** Para notificações amigáveis ao usuário.

## ⚙️ Como Rodar o Projeto Localmente

1.  **Clone o repositório do frontend:**
    ```bash
    git clone https://github.com/Marcelo336/devbills-frontend.git
    cd devbills-frontend
    ```
2.  **Instale as dependências:**
    ```bash
    yarn install # ou npm install
    ```
3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto `devbills-frontend` e adicione as seguintes variáveis:
    ```
    VITE_FIREBASE_API_KEY=sua_api_key_do_firebase
    VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain_do_firebase
    VITE_FIREBASE_PROJECT_ID=seu_project_id_do_firebase
    VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket_do_firebase
    VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id_do_firebase
    VITE_FIREBASE_APP_ID=seu_app_id_do_firebase
    VITE_API_URL=http://localhost:3001/api # ou a URL do seu backend em deploy
    ```
    
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    yarn dev # ou npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## 🤝 Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou encontrar bugs, por favor, abra uma issue ou envie um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.