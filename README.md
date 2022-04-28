# Backend responsável pela comunicação com Third-Party API

## Sobre

  ### Funcionalidades
    - Pesquisa de ações através de uma substring
    - Consulta de informações (abertura, fechamento, máximo e mínimo) de ações dado um periodo de tempo e intervalo de consulta
    - Cacheamento das respostas 

  ### Tecnologias Utilizadas
    - NodeJS
    - Typescript
    - Express
    - Redis

  Implementado utilizando DDD e Injeção de Dependências para maior desacoplamento e manutenibilidade

  ### Passos para execução

    - Inicialize o Docker
    - Execute o comando `docker-compose up --build`
