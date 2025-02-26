LISTENPLAY

- Plataforma para ouvir músicas

Perfis:

- Moderador:
  Tipo de usuário com permissão para adicionar novas músicas (fazer upload);
- Cliente:
  Tipo de usuário que pode criar playlists e adicionar músicas;

Funções:

- Cadastro de clientes (Com envio de email de "bem vindo")
- Mostrar músicas disponíveis na plataforma e criar um filtro de gênero musical;
- Dar like ou deslike na música;
- Mostrar lista de 5 músicas mais tocadas;
- Mostrar todas as playlists disponíveis;
- Adicionar outro usuário como amigo;
- Mostrar listas de amigos e suas playlists;
- Mostrar listenplay top vip (usuário com mais músicas ouvidas)

Dicas:

- Os moderadores não precisam de serviço de cadastro, podem ser cadastro via sistema,
  já que são usuários "internos";
- Validar modelo de dados antes de começar desenvolvimento;
- Utilizar boas práticas já aprendidas;
- Utilizar cache de (5m) no endpoint de top músicas ouvidas, pois
  seria uma busca custosa

  Tabelas:
  user{
  id
  amigos:user[],
  playlists:playlist[]
  }
  playlist{
  id
  nome
  musicas:musica[]
  }
  interacao{
  id
  idUser
  idMusica
  play
  like
  }

  musica{
  id
  nome
  data
  url
  genero
  interacao:[]
  }
