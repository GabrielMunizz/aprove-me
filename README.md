# Bankme - Aprove-me

## Sobre o teste técnico da Bankme:

![allDevices.png](./README_thumbs/allDevices.png)

Este teste técnico foi desenvolvido com as seguintes tecnologias:

- **Next.js**: Framework React para renderização do lado servidor (SSR) e otimização automática de páginas. Permite criar aplicativos rápidos e escaláveis..
- **Tailwind CSS**: Framework CSS utilitário para criar layouts responsivos e estilizar componentes de forma rápida e eficiente, sem escrever CSS personalizado.
- **Nest.js**: Framework Node.js para criar back-ends escaláveis usando TypeScript. Organiza o código de forma modular e facilita a integração com outras ferramentas.
- **Docker**: Plataforma para criar, testar e rodar aplicativos em containers. Garante consistência entre os ambientes de desenvolvimento e produção.
- **RabbitMQ**: Broker de mensagens que gerencia filas e facilita a comunicação assíncrona entre serviços. Garante alta disponibilidade e escalabilidade em sistemas distribuídos.
- **Prisma:** ORM para Node.js e TypeScript que simplifica o acesso ao banco de dados. Ele gera consultas SQL automaticamente, oferece tipagem forte e facilita a integração com bancos relacionais.

O teste inclui:

- **Tela de login**: **user**: _aprovame_ **password**: _aprovame_.
- **Home**: Página principal onde se cadastram e são exibidos os recebíveis.
- **Detalhes do recebível**: ID do recebível, valor, data de emissão e nome do cedente.
- **Detalhes do cedente**: ID do cedente, nome, e-mail, telefone e documento (CPF ou CNPJ) do cedente.

---

## Antes de começar:

- Certifique-se que tem o **Docker** instalado no seu computador. Caso não tenha, siga a documentação a seguir: [Guia de instalação do Docker](https://docs.docker.com/get-docker/).
- Verifique se as portas 3000 e 3001 estão liberadas.

## Como Executar o Projeto Localmente:

1. Clone este repositório:

```jsx
git clone https://git@github.com:GabrielMunizz/aprove-me.git
```

1. Entre na pasta do projeto:

```jsx
cd aprove-me
```

1. Mude para a branch **muniz-branch**:

```jsx
git checkout muniz-branch
```

1. Monte os containers docker com o comando:

```jsx
docker compose up --build
```

1. Abra o navegador em:

```jsx
http://localhost:3000
```

1. Faça login com o usuário e senha abaixo:

   ![image.png](./README_thumbs/image.png)

```jsx
login: aprovame;
password: aprovame;
```

1. Para parar a aplicação, use `Ctrl+C` no terminal onde o Docker Compose está rodando, ou execute `docker-compose down` para parar e remover os contêineres.

## Rotas do backend:

### **Payable**:

Tipagem:

```jsx
value: number;
emissionDate: Date;
assignorId: uuid;
```

1. Cadastro de recebível:

```jsx
POST http://localhost:3001/integrations/payable

Exemplo
Body:
{
	"value": 158.97,
  "emissionDate": "2025-03-23T00:00:28.403Z",
  "assignorId": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
 }
```

1. Listar recebíveis:

```jsx
GET http://localhost:3001/integrations/payable

Exemplo de retorno:
[
	{
		"id": "150cff95-21ab-441a-9c20-11d4bb2712d1",
		"value": 8732.73,
		"emissionDate": "2025-03-26T03:00:00.000Z",
		"assignorId": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
		"isDeleted": false
	},
	{
		"id": "5da6e0e8-4fea-4447-bd4b-c82c5dd77fd0",
		"value": 335,
		"emissionDate": "2025-03-23T00:00:28.403Z",
		"assignorId": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
		"isDeleted": false
	},
]
```

1. Recebível por ID:

```jsx
GET http://localhost:3001/integrations/payable/:id

Exemplo de retorno:
{
	"id": "5da6e0e8-4fea-4447-bd4b-c82c5dd77fd0",
	"value": 335,
	"emissionDate": "2025-03-23T00:00:28.403Z",
	"assignorId": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
	"isDeleted": false
 }
```

1. Alterar recebível (Update):

```jsx
PATCH http://localhost:3001/integrations/payable/:id

Exemplo de retorno:
{
	"id": "5da6e0e8-4fea-4447-bd4b-c82c5dd77fd0",
	"value": 335,
	"emissionDate": "2025-03-23T00:00:28.403Z",
	"assignorId": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
	"isDeleted": false
 }
```

1. Deletar recebível (Soft delete):

```jsx
DELETE http://localhost:3001/integrations/payable/:id

Exemplo de retorno:
{ message: 'Recebível deletado com sucesso!' }
```

1. Listar recebíveis deletados:

```jsx
GET http://localhost:3001/integrations/payable/recover/all

Exemplo de retorno:
[
	{
		"id": "a77827b3-8298-46bb-88e1-6079c019c722",
		"value": 2560,
		"emissionDate": "2025-03-10T03:00:00.000Z",
		"assignorId": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
		"isDeleted": true
	},
	{
		"id": "6fa29aee-e29f-457e-9d00-1bc35bfd6a71",
		"value": 135.78,
		"emissionDate": "2025-03-22T22:03:00.210Z",
		"assignorId": "1a62f746-0e89-4c39-9749-6859d91ed8c9",
		"isDeleted": true
	},
]
```

1. Recuperar recebível deletado:

```jsx
PATCH http://localhost:3001/integrations/payable/recover/:id

Exemplo de retorno:
{ message: 'Recebível recuperado com sucesso!' }
```

### Assignor:

Tipagem:

```jsx
"document": string,
"email": string,
"phone": string,
"name": string,
```

1. Cadastro de cedente:

```jsx
POST http://localhost:3001/integrations/assignor

Exemplo
Body:
{
  "document": "99999999999",
  "email": "teste@teste.com",
  "phone": "(32) 984863437",
  "name": "Testando da Silva"
}
```

1. Listar cedentes:

```jsx
GET http://localhost:3001/integrations/assignor

Exemplo de retorno:
[
	{
		"id": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
		"document": "99999999999",
		"email": "testando@teste.com",
		"phone": "99999999999",
		"name": "Testando da Silva",
		"isDeleted": false
	},
	{
		"id": "1a62f746-0e89-4c39-9749-6859d91ed8c9",
		"document": "99999999999",
		"email": "teste@teste.com",
		"phone": "99999999999",
		"name": "Teste Oliveira",
		"isDeleted": false
	},
]
```

1. Cedente por ID:

```jsx
GET http://localhost:3001/integrations/assignor/:id

Exemplo de retorno:
 {
		"id": "1a62f746-0e89-4c39-9749-6859d91ed8c9",
		"document": "99999999999",
		"email": "teste@teste.com",
		"phone": "99999999999",
		"name": "Teste Oliveira",
		"isDeleted": false
	}
```

1. Alterar cedente (Update):

```jsx
PATCH http://localhost:3001/integrations/assignor/:id

Exemplo de retorno:
 {
		"id": "1a62f746-0e89-4c39-9749-6859d91ed8c9",
		"document": "99999999999",
		"email": "teste@teste.com",
		"phone": "99999999999",
		"name": "Teste Oliveira",
		"isDeleted": false
	}
```

1. Deletar cedente (Soft delete):

```jsx
DELETE http://localhost:3001/integrations/assignor/:id

Exemplo de retorno:
{ message: 'Cedente deletado com sucesso!' }
```

1. Listar cedentes deletados:

```jsx
GET http://localhost:3001/integrations/assignor/recover/all

Exemplo de retorno:
[
	{
		"id": "7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2",
		"document": "99999999999",
		"email": "testando@teste.com",
		"phone": "99999999999",
		"name": "Testando da Silva",
		"isDeleted": true
	},
	{
		"id": "1a62f746-0e89-4c39-9749-6859d91ed8c9",
		"document": "99999999999",
		"email": "teste@teste.com",
		"phone": "99999999999",
		"name": "Teste Oliveira",
		"isDeleted": true
	},
]
```

1. Recuperar cedente deletado:

```jsx
PATCH http://localhost:3001/integrations/assignor/recover/:id

Exemplo de retorno:
{ message: 'Cedente recuperado com sucesso!' }
```

### Auth(login)

Tipagem:

```jsx
"login": string,
"password": string,
```

1. Login de usuário:

```jsx
POST http://localhost:3001/integrations/auth

Exemplo
Body:
{
	"login": "aprovame",
	"password": "aprovame"
}

Retorno:
{
	"accessToken": "token"
}
```

# Entre em contato comigo:

[Portfolio](https://gabrielmunizz.github.io/)

[LinkedIn](https://www.linkedin.com/in/gabriel-muniz-dev/)

[GitHub](https://github.com/GabrielMunizz)

Email: gabrielmfd@gmail.com
