# EPonto
Teste para a vaga de desenvolvedor FrontEnd na Gênesis

## Instruções

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Rode o projeto com `npm run dev`
4. Acesse `https://localhost:443/`

## Tecnologias utilizadas

- Vite
- React
- Shadcn UI
- TailwindCSS

## Testes

- Axios
- Axios Mock Adapter

## Estrutura de pastas

- `src/components/ui`: Componentes Shadcn UI
- `src/components/global`: Componentes globais
- `src/components/forms`: Componentes de formulários
- `src/pages`: Páginas da aplicação
- `src/Services`: Serviços da aplicação
- `src/Providers`: Providers da aplicação

## Estrutura de arquivos

- `src/App.tsx`: Arquivo principal da aplicação
- `src/index.tsx`: Arquivo de inicialização da aplicação
- `src/routes.tsx`: Arquivo de rotas da aplicação
- `src/axios.config.tsx`: Configuração do Axios e Mock Adapter

## Observações

- O projeto foi desenvolvido com base no layout fornecido
- No arquivo `vite.config.ts` foi configurado os arquivos de certificado SSL para rodar o projeto em HTTPS
- Os arquivos de certificado SSL estão na pasta `certificate/`
- Os arquivos de certificado foram gerados com certbot para o dominio gandrei.dev.br

## Autor

- Gabriel Andrei Oliveira da Silva Pain
- Email: andrei04@hotmail.com