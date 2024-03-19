# ByteVet API 

<p> Essa é a API da aplicação ByteVet, que tem como objetivo centralizar informações veterinárias para que usuários como tutores e veterinários façam uso de sua facilidade. Formulada para a disciplina de Projeto em Computação I do curso de Ciência da Computação da UFCG, a aplicação tem como funcionalidades principais: </p>
<ul><li>Registro de informações clínicas dos animais, incluindo histórico;</li></ul>
<ul><li>Integração dos dados entre diferentes usuários da aplicação;</li></ul>
<ul><li>Notificações personalizadas com informações como lembretes de vacinação e consultas;</li></ul>
<ul><li>Agendamentos de consultas e mais.</li></ul>

## Como rodar? 
### Via Docker:
```docker build -t apibytevet .```

Em seguida, inicie o container: 

```docker run -dp 3000:3000 apibytevet```