Ferramenta de Auditoria de Projetos

Uma aplicação web full-stack desenvolvida para automatizar e gerir o processo de auditoria de projetos e documentos. A ferramenta permite criar checklists dinâmicos, registar não conformidades, calcular a aderência automaticamente e gerir o ciclo de vida de cada item, incluindo resolução e escalonamento por e-mail.

✨ Funcionalidades Principais
Dashboard de Aderência: Calcula e exibe em tempo real o percentual de conformidade do projeto auditado, com base nos itens do checklist.

Checklist Dinâmico: Permite adicionar novos itens de verificação a qualquer momento, definindo status (Sim, Não, Não se Aplica), responsável e classificação.

Gestão de Não Conformidades (NCs):

Registo detalhado de NCs associadas a itens do checklist marcados como "Não".

Atribuição de descrição, classificação, responsável e prazo para cada NC.

Fluxo de Trabalho de Resolução:

As NCs podem ter os status: ABERTO, ESCALONADO e RESOLVIDO.

Permite marcar uma NC como resolvida, registando a data da resolução.

Escalonamento por E-mail: Funcionalidade para escalonar uma não conformidade aberta, enviando um e-mail detalhado para o endereço especificado.

🛠️ Tecnologias Utilizadas
A aplicação foi construída com uma arquitetura moderna, separando o backend do frontend.

Backend
Java 17+

Spring Boot 3.x

Spring Web: Para a criação de endpoints RESTful.

Spring Data JPA: Para a persistência de dados.

Spring Boot Starter Mail: Para o envio de e-mails.

Hibernate: Como implementação da JPA.

Maven: Para a gestão de dependências.

H2 Database: Banco de dados em memória para facilitar a execução e os testes.

Frontend
HTML5 e CSS3

JavaScript (ES6+)

React (via CDN): Para a construção de uma interface de utilizador dinâmica e reativa sem a necessidade de um ambiente Node.js.

Bootstrap 5: Para a criação de um layout moderno e responsivo.

Babel (standalone): Para a transpilação de JSX diretamente no navegador.

🚀 Como Executar o Projeto

Siga os passos abaixo para executar a aplicação localmente.

Pré-requisitos
JDK 17 ou superior instalado.

Maven configurado nas variáveis de ambiente.

Uma IDE de sua preferência (ex: IntelliJ IDEA, Eclipse, VS Code).

Uma conta de e-mail (ex: Gmail) para configurar o serviço de envio.

1. Configuração do Backend

a. Clone o repositório:

git clone [https://github.com/mateusblm/audittool.git]([https://github.com/mateusblm/audittool.git])

cd audittool

b. Configure o serviço de e-mail:

Abra o ficheiro src/main/resources/application.properties e insira as suas credenciais de e-mail.

Atenção: Se usar o Gmail com autenticação de dois fatores, precisa de gerar uma "Senha de App". Saiba como aqui.

# Exemplo para o Gmail

spring.mail.host=smtp.gmail.com

spring.mail.port=587

spring.mail.username=seu-email@gmail.com

spring.mail.password=SUA_SENHA_DE_APP

spring.mail.properties.mail.smtp.auth=true

spring.mail.properties.mail.smtp.starttls.enable=true

2. Execução

a. Pela IDE:

Importe o projeto como um projeto Maven.

Encontre a classe AudittoolApplication.java.

Execute o método main.

b. Pela linha de comando:
Navegue até a raiz do projeto e execute:

./mvnw spring-boot:run

O backend estará a ser executado em http://localhost:8080.

3. Abrir o Frontend

Abra o seu navegador e entre em:

http://localhost:8080

O Spring Boot servirá automaticamente o index.html e a aplicação estará pronta para ser usada.

🗺️ Endpoints da API

GET /api/auditoria/aderencia: Retorna os dados de aderência.

GET /api/auditoria/checklist: Lista todos os itens do checklist.

POST /api/auditoria/checklist: Adiciona um novo item ao checklist.

GET /api/auditoria/naoconformidade: Lista todas as não conformidades (usando DTOs).

POST /api/auditoria/checklist/{id}/naoconformidade: Cria uma nova não conformidade.

PUT /api/auditoria/naoconformidade/{id}/resolver: Marca uma NC como resolvida.

POST /api/auditoria/naoconformidade/{id}/escalonar: Envia um e-mail para escalonar uma NC.
