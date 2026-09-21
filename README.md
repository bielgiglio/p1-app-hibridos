# Instagram Clone - Mobile (React Native & Expo)

Projeto desenvolvido com foco na construção de interfaces móveis modernas, componentização reutilizável e navegação com base em rotas com Expo Router.

---

## 📱 Telas Implementadas

1. **Login (`/login`)**: Tela de autenticação com validação visual e redirecionamento para o fluxo autenticado.
2. **Feed Principal (`/(tabs)/index`)**: Feed de publicações com carrossel horizontal de Stories e listagem de postagens interativas.
3. **Explorar (`/(tabs)/explore`)**: Barra de pesquisa com limpeza dinâmica e grade de fotos.
4. **Atividade / Notificações (`/(tabs)/activity`)**: Listagem de notificações com ações dinâmicas de seguir/deixar de seguir.
5. **Perfil (`/(tabs)/profile`)**: Foto de perfil, contadores de métricas, biografia, destaques e grade de publicações.
6. **Detalhes do Post (`/post-detail`)**: Tela com exibição completa da foto selecionada, curtida interativa e parâmetros de rota.

---

## 🛠️ Tecnologias Utilizadas

- **React Native** com **TypeScript**
- **Expo** e **Expo Router** (File-based Routing)
- **@expo/vector-icons** (Feather icons)

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/bielgiglio/p1-app-hibridos
   cd app-p1
   ```

Instale as dependências:
```Bash
npm install
```
Inicie o servidor Metro Bundler:
```Bash
npx expo start
```
Abra o aplicativo Expo Go no dispositivo físico e escaneie o QR Code gerado no terminal.