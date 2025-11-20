# REFRAME – Plataforma de Upskilling/Reskilling com IA (Mobile)

Aplicativo desenvolvido em **React Native com Expo (Expo Router)** para a disciplina **Mobile Development & IoT** do curso de **Engenharia de Software – FIAP**.

A proposta do REFRAME é oferecer uma experiência de **upskilling e reskilling personalizada**, simulando o uso de IA para apoiar profissionais na transição de carreira e na preparação para o **Futuro do Trabalho**.

---

##  Objetivo do Projeto


* Avalie as habilidades atuais do usuário;
* Identifique lacunas relevantes para as profissões do futuro;
* Sugira **trilhas de aprendizado** com micro-cursos, projetos práticos e “tarefas de transição”;
* Utilize **gamificação** (XP, níveis, badges) para engajar o usuário;
* Persista todos os dados localmente usando **AsyncStorage**, sem backend.

O app foi projetado para ser simples, demonstrar domínio de **React Native + Expo + AsyncStorage** e, ao mesmo tempo, estar alinhado ao tema **“O Futuro do Trabalho”**.

---

##  Funcionalidades

* **Cadastro de Perfil**
  O usuário informa:

  * Nome
  * Situação profissional atual
  * Objetivo / próximo papel (ex.: "Analista de Dados", "Dev Back-end", etc.)

* **Avaliação de Habilidades (Upskilling/Reskilling)**
  O usuário avalia seu nível (0 a 5) em habilidades como:

  * Lógica de Programação
  * Front-end
  * Back-end / APIs
  * Dados & Analytics
  * IA & Automação
  * Soft Skills (comunicação, colaboração)

* **Recomendações de Trilhas de Aprendizado**
  Com base nas habilidades com menor pontuação e na área objetivo, o app sugere trilhas compostas por:

  * **Micro-cursos** (fundamentos técnicos)
  * **Projetos práticos** (aplicação em cenários reais)
  * **Tarefas de transição** (atividades que aproximam o usuário da nova função)

* **Gamificação**
  Cada módulo concluído em uma trilha concede **XP**, que alimenta:

  * **Níveis** do usuário (Level 0 a 4);
  * **Badges**, como:

    * "Primeiro passo no upskilling"
    * "Trilha em progresso consistente"
    * "Agente do Futuro do Trabalho"
    * "Embaixador de Transformação Digital"

* **Persistência Local com AsyncStorage**
  Todas as informações são salvas localmente:

  * Dados de perfil
  * Avaliação de habilidades
  * Progresso nas trilhas
  * XP e gamificação

Ao fechar e abrir o app, o usuário retoma exatamente de onde parou.

---

##  Tecnologias Utilizadas

* **React Native**
* **Expo (última versão)**
* **Expo Router** (modelo de navegação baseado em arquivos)
* **TypeScript**
* **AsyncStorage** – `@react-native-async-storage/async-storage`

Principais bibliotecas:

```bash
expo
expo-router
react-native
@react-native-async-storage/async-storage
```

---

##  Estrutura de Pastas (simplificada)

```bash
reframe-app/
  app/
    _layout.tsx        # Configuração do Stack do Expo Router
    index.tsx          # Tela inicial (decide entre perfil ou dashboard)
    profile.tsx        # Cadastro/edição de perfil
    skills.tsx         # Avaliação de habilidades
    dashboard.tsx      # Dashboard com recomendações e gamificação
    path-detail.tsx    # Detalhes de cada trilha (módulos, XP, conclusão)

  constants/
    futureSkills.ts    # Constantes, tipos, helpers, estilos globais

  assets/              # (opcional) ícones, fontes, imagens

  package.json
  app.json
  tsconfig.json
  README.md
```

---

##  Como Rodar o Projeto Localmente

### 1. Pré-requisitos

* NPM ou Yarn
* App **Expo Go** instalado no celular (Android/iOS) **ou** emulador configurado

### 2. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO-GITHUB/reframe.git
cd reframe
```

### 3. Instalar as dependências

```bash
npm install
# ou
yarn install
```

### 4. Rodar o projeto com Expo

```bash
npx expo start
# ou
npm start
```

* Escaneie o QR Code com o app **Expo Go** (Android/iOS)
  **ou** abra em um emulador.

---

##  Como Demonstrar os Requisitos na Apresentação

Sugestão de fluxo para o vídeo/demo da disciplina:

1. **Tela de Perfil**

   * Preencher nome, situação atual e objetivo.
   * Salvar e mostrar que o app navega para o dashboard.

2. **Avaliação de Habilidades**

   * Abrir a tela de avaliação a partir do dashboard.
   * Preencher alguns níveis de skills (0 a 5).
   * Salvar e voltar para o dashboard.

3. **Recomendações de Trilhas**

   * Mostrar as trilhas sugeridas com base nas habilidades e objetivo.
   * Explicar rapidamente o alinhamento com o tema **“Futuro do Trabalho”**.

4. **Gamificação e Progresso**

   * Abrir uma trilha (tela de detalhes).
   * Marcar módulos como concluídos.
   * Mostrar XP, nível e badges sendo atualizados.

5. **Persistência com AsyncStorage**

   * Fechar o app.
   * Reabrir e mostrar que:

     * Perfil continua salvo;
     * Avaliação de habilidades permanece;
     * Progresso nas trilhas e XP continuam consistentes.

Isso comprova o uso correto do **AsyncStorage** e atende aos requisitos da disciplina.

---

##  Tema: Futuro do Trabalho

O REFRAME foi pensado para dialogar diretamente com o tema **“O Futuro do Trabalho”** ao:

* Apoiar **transições de carreira** em áreas em alta (dados, desenvolvimento, IA, etc.);
* Enxergar habilidades como algo **dinâmico**, que precisa ser constantemente atualizado;
* Usar IA (aqui simulada em regras de recomendação) como **copiloto de desenvolvimento profissional**;
* Incentivar **experiências práticas e colaborativas**, por meio das tarefas de transição.

---

##  Integrantes do Grupo

* Julio Cesar Zampieri (RM: 98772)
* João Gabriel Dias de Mello do Nascimento (RM: 99092)
* Ricardo Augusto de Matos Filho (RM: 95906)


