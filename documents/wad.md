# Criação Web de Leandro Precaro - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto: 

## Autor do projeto: Leandro Precaro Barankiewicz Filho


## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

&emsp;&emsp; Como um método de aprendizado diferente dos comuns, a Inteli se destaca por ter um metodologia me que coloca seus alunos para aprenderem produzindo e nada mais justo do que aprender a programar site do zero com back-end, front-end e banco de dados. Então com a explicação acima, esse projeto será a produção de um site em JavaScript do zero, com a finalidade de ensinar todos, desde de quem nunca fez um site até mesmo quem já tem experiencia nessa área, a programar um site com tudo ja descrito, mas também utilizando o modelo MVC no seu código.

&emsp;&emsp; Neste caso, a função da Web será de sistema de reserva, no qual o usuário poderá fazer reservas de salas e terá seus cadastro, podendo ver horários disponíveis para agendamento, a disponibilidade das salas, quais estão cheias ou não, informações gerais da reserva, como data, horário, objetos dentro da sala, se foi reservada ou não. Como qualquer site, também é possível fazer novos cadastros, desmarcar revservas, dsefazer login, entre outras funcionalidades.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

&emsp;&emsp;&emsp; Nessa seção será demonstrado com imagens e suas devidas explicações do Diagrama Entidade e Relacionamento (DER), que a forma lógica do nosso projeto da MER (diagrama feito para identificar cada entidade e relação entre elas), e o Modelo Físico do banco de dados implementado dentro do arquivo .sql (nada mais é que a própria implementação e criação das tabelas dentro do banco de dados).

&emsp;&emsp; Será apresentado primeiramente o DER e depois o Modelo Físico.

## Diagrama Entidade e Relacionamento.

Primeiro será explicado cada entidade e depois a relação entre elas para ficar mais fácil o entendimento.

### Entiadades.
<p align="center">Tabela de Usuários. </p>

<p align="center"> <img src="../assets/assetsWAD/tabela_usuario.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>

&emsp;&emsp; Essa tabela é referente as informações que serão guardadas quando o futuro usuário do nosso site se cadastrar em nosso site. Os atributos possíveis de ser vistos são: **ID**(número de identificação gerado automaticamente após o cadastro), **Email**, **Senha**, **Empresa/escola** e **Número de celular** são informações colocadas pelo usuários na hora do cadastro. Função de Número de celular, Email e Empresa/escola são mais para um cadastro completo e lugares de contato ou futuro envio de notificações. Já a senha é para segurança de nosso cliente. Outros dois atributos importantes são: **created_at** e o **update_at**. São responsáveis por fixar informações na hora de sua criação, como data e horário e para atualizar as informações iniciais após uma mudança nas informações do usuário, respectivamente.

<p align="center">Tabela Intermediária de Usuários-Notificação. </p>

<p align="center"> <img src="../assets/assetsWAD/tabela_usuario-notificacao.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>

&emsp;&emsp; Por haver uma relação de N:N entre as tabelas Usuários e Notificação, é necessário, tanto para uma melhor busca nos dados quanto para bons modos do SQL, criar uma tabela intermediária que tem apenas 3 atributos: **ID** próprio, **ID_usuario** e **ID_notificacao**, esses dois responsáveis por apenas fazerem o relacionamento entre eles e essa tabela. Para a pesquisa, apenas necessário colocar o ID da notificação e do usuário para filtrar todas. Muito mais prático e fácil.

<p align="center">Tabela Intermediária de Usuários-Salas. </p>

<p align="center"> <img src="../assets/assetsWAD/tabela_usuario-salas.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>

&emsp;&emsp; Por haver uma relação de N:N entre as tabelas Usuários e Salas, é necessário, tanto para uma melhor busca nos dados quanto para bons modos do SQL, criar uma tabela intermediária que tem apenas 3 atributos: **ID** próprio, **ID_usuario** e **ID_salas**, esses dois responsáveis por apenas fazerem o relacionamento entre eles e essa tabela. Para a pesquisa, apenas necessário colocar o ID da notificação e do usuário para filtrar todas. Muito mais prático e fácil.

<p align="center">Tabela de Notificações. </p>

<p align="center"> <img src="../assets/assetsWAD/tabela_notificacao.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>

&emsp;&emsp; Essa tabela se diferencia um pouco das demais porque ela será apenas textos. Seus atributos são: **ID**(número de identificação gerado automaticamente após o envio da notificação), **Título**, como o nome já é auto-explicativo, ela será o título da notificação, **Mensagem**, ela será a descrição e o texto explicando o que será ou para que será a notificação. Outros dois atributos importantes são: **created_at** e o **update_at**. São responsáveis por fixar informações na hora de sua criação, como data e horário e para atualizar as informações iniciais após uma mudança nas informações do usuário, respectivamente.

<p align="center">Tabela de Salas. </p>
<p align="center"> <img src="../assets/assetsWAD/tabela_salas.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>
&emsp;&emsp; Essa tabela é gerada após o cadastro de alguma sala para aluguel, tendo como atributos: **ID** (número de identificação gerado automaticamente após o cadastro das slas no site), **Local**, importantíssimo para que possamos filtrar as salas por locais e só entregar o que o cliente espera, **Descrição**, ela será a descrição sobre a sala apenas, **Capacidade**, também para servir de filtragem, mostrará a quantidade máxima que a sala comporta. Outros dois atributos importantes são: **created_at** e o **update_at**. São responsáveis por fixar informações na hora de sua criação, como data e horário e para atualizar as informações iniciais após uma mudança nas informações do usuário, respectivamente.


<p align="center">Tabela de Reservas. </p>
<p align="center"> <img src="../assets/assetsWAD/tabela_reserva.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>

&emsp;&emsp; Essa tabela é a mais complexa, já que existe mais de uma relação entre entidades e com o maior número de entidades. Seus atributos são: **ID** (número de identificação gerado automaticamente após a reserva ser solicitada), **ID_usuario**, será muito importante para que seja guardada a informação de cada solicitação e linkada ao usuário que tentou faze-la, **id_salas**, esse ID é responsável por fazer o relacionamento de dependencia da entidade sala para que a entidade reservas seja criada, **Título**, é o título da reserva, **Data, status,  horario_inicio e  horario_final** terão a mesma função de filtragem, vou explicar. Data será responsável por retirar todas as salas que não tem nesta data, Status é referente se a sala já foi alugada e horario inicio e  horario final será responsável por puxar apenas as salas que os horários entre o começo e o final do aluguel solicitado sejam mostrados. Outros dois atributos importantes são: **created_at** e o **update_at**. São responsáveis por fixar informações na hora de sua criação, como data e horário e para atualizar as informações iniciais após uma mudança nas informações do usuário, respectivamente.
 
<p align="center">Diagrama ER Inteiro. </p>
<p align="center"> <img src="../assets/assetsWAD/DER_inteiro_WAD.png">
<br> <sub>Fonte: Autoral (2025)</sub> </p>
&emsp;&emsp; Aqui explicarei as relações entre todas as entidades presentes no diagrama. 

##### Relacionamento 

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---