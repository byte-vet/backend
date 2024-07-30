# ByteVet API 

<p> Essa é a API da aplicação ByteVet, que tem como objetivo centralizar informações veterinárias para que usuários como tutores e veterinários façam uso de sua facilidade. Formulada para a disciplina de Projeto em Computação I do curso de Ciência da Computação da UFCG, a aplicação tem como funcionalidades principais: </p>
<ul><li>Registro de informações clínicas dos animais, incluindo histórico;</li></ul>
<ul><li>Integração dos dados entre diferentes usuários da aplicação;</li></ul>
<ul><li>Notificações personalizadas com informações como lembretes de vacinação e consultas;</li></ul>
<ul><li>Agendamentos de consultas e mais.</li></ul>

## Documentação da API
https://documenter.getpostman.com/view/19816788/2sA3Bq3WGp

## Como rodar? 

### Manualmente: 
Instale o node (versão >= 20):
```
# installs NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js
nvm install 20
````
Em seguida instale as dependências com o comando: 

``npm install`` 

Por fim, rode a API com o comando:

``npm start`` 

Ao concluir, você pode acessar a API usando:

```http://localhost:3000```

### Via Docker:
```docker build -t apibytevet .```

Em seguida, inicie o container: 

```docker run -dp 3000:3000 apibytevet```

Ao concluir, você pode acessar a API usando:

```http://localhost:3000```
