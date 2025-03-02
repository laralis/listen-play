# LISTENPLAY

**LISTENPLAY** é uma plataforma para ouvir músicas, onde os usuários podem criar playlists, adicionar músicas e interagir com outros usuários. Existem dois tipos de perfis de usuários: **Moderador** e **Cliente**, com diferentes permissões e funcionalidades.

## Perfis

- **Moderador**:  
  Usuário com permissão para adicionar novas músicas à plataforma (fazer upload).

- **Cliente**:  
  Usuário que pode criar playlists e adicionar músicas.

## Funcionalidades

### 1. **Cadastro de Clientes**

O cliente pode se cadastrar na plataforma e receber um email de "bem-vindo".

### 2. **Exibição de Músicas Disponíveis**

A plataforma exibirá todas as músicas disponíveis e permitirá filtrar por gênero musical.

### 3. **Curtir ou Descurtir Músicas**

Os usuários podem interagir com as músicas, dando "like" ou "dislike".

### 4. **Top 5 Músicas Mais Tocadas**

Uma lista com as 5 músicas mais tocadas da plataforma será exibida.

### 5. **Exibição de Playlists Disponíveis**

Todos os usuários poderão visualizar todas as playlists disponíveis na plataforma.

### 6. **Adicionar Amigos**

Os usuários podem adicionar outros usuários como amigos.

### 7. **Exibição de Amigos e Suas Playlists**

O usuário poderá visualizar a lista de amigos e suas respectivas playlists.

### 8. **Listenplay Top VIP**

Um ranking com o usuário mais ouvido será exibido, baseado nas músicas ouvidas na plataforma.

## Implementação

Realizei uma validação do modelo de dados para garantir que a estrutura do banco de dados fosse bem definida e consistente, evitando problemas no futuro relacionados à integridade e eficiência dos dados.

Segui boas práticas de desenvolvimento para garantir a qualidade do código e a facilidade de manutenção.

Para melhorar o desempenho, implementei o uso de cache com expiração de 5 minutos no endpoint de busca das músicas mais tocadas.

## Resumo das Dependências Mais Importantes

- **AdonisJS**:  
  Utilizei várias bibliotecas do AdonisJS, como `@adonisjs/core`, `@adonisjs/auth` e `@adonisjs/lucid`, para facilitar a criação de rotas, autenticação de usuários e interação com o banco de dados de forma segura e eficiente.

- **Cache**:  
  A biblioteca `@adonisjs/cache` foi empregada para melhorar o desempenho da plataforma, implementando cache com expiração de 5 minutos nos endpoints críticos, como o de top músicas mais tocadas.

- **MySQL**:  
  Para a comunicação com o banco de dados, foi utilizada a biblioteca `mysql2`, garantindo uma conexão eficiente e confiável com o MySQL, que é o banco de dados utilizado para armazenar informações da plataforma.

- **Email**:  
  A biblioteca `@adonisjs/mail` foi usada para implementar o envio de emails, como o email de boas-vindas para os clientes que se cadastram na plataforma.

- **Vine**:  
  Utilizei o `@vinejs/vine` como validador para garantir a integridade dos dados de entrada. O Vine ajuda a validar as entradas dos usuários, garantindo que as informações sejam consistentes e seguras antes de serem processadas pela plataforma.