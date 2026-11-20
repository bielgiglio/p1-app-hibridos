# Instagram Clone — Aplicação Mobile Híbrida (React Native & Expo Router)

Projeto desenvolvido na disciplina de **Desenvolvimento de Aplicações Híbridas** (Engenharia de Software — Universidade de Vassouras), evoluindo uma interface inspirada no Instagram para uma arquitetura mobile completa com navegação protegida, consumo de API REST, persistência local e segura, cache offline com validade (TTL) e tema dinâmico (Claro/Escuro).

---

## Tecnologias e Bibliotecas Utilizadas

- **React Native & Expo (SDK 58)** com **TypeScript**
- **Expo Router** (roteamento baseado em ficheiros, grupos `(auth)` e `(app)`, abas inferiores, rotas dinâmicas `[id]`, modais e tela `+not-found`)
- **AsyncStorage (`@react-native-async-storage/async-storage`)** para persistência de sessão, perfil e preferências de tema
- **Expo SecureStore (`expo-secure-store`)** para armazenamento criptografado do token de autenticação (Keychain / Keystore)
- **NetInfo (`@react-native-community/netinfo`)** para monitorização de conectividade em tempo real e aviso offline
- **JSONPlaceholder REST API** para consumo de publicações (`GET /posts`), detalhes (`GET /posts/:id`), autores (`GET /users`) e criação de novos posts (`POST /posts`)

---

## Estrutura de Pastas

```text
src/
├── app/
│   ├── _layout.tsx                 # Providers globais (ThemeProvider, AuthProvider) e SplashScreen
│   ├── index.tsx                   # Redirecionamento inicial baseado na sessão
│   ├── +not-found.tsx              # Página de rota não encontrada
│   ├── (auth)/                     # Rotas públicas de autenticação
│   │   ├── _layout.tsx
│   │   ├── login.tsx               # Tela 1: Login
│   │   └── register.tsx            # Tela 2: Cadastro
│   └── (app)/                      # Rotas protegidas (exigem sessão ativa)
│       ├── _layout.tsx             # Stack protegido + OfflineBanner
│       ├── (tabs)/
│       │   ├── _layout.tsx         # Navegação por abas inferiores
│       │   ├── index.tsx           # Tela 3: Feed principal (FlatList, API, Pull-to-Refresh)
│       │   ├── explore.tsx         # Tela 4: Explorar (pesquisa e grelha)
│       │   ├── activity.tsx        # Tela 5: Atividades e notificações
│       │   └── profile.tsx         # Tela 6: Perfil do utilizador
│       ├── post-detail.tsx         # Tela 7: Detalhe de publicação (estática)
│       ├── post/[id].tsx           # Tela 8: Detalhe dinâmico da publicação via API + comentários
│       ├── nova-publicacao.tsx     # Tela 9: Modal de criação de publicação (POST /posts)
│       ├── editar-perfil.tsx       # Tela 10: Edição de perfil persistida no AsyncStorage
│       ├── configuracoes.tsx       # Tela 11: Configurações (Switch Dark Mode, limpar cache, Logout)
│       └── story/[id].tsx          # Tela 12: Visualizador interativo de Stories
├── components/                     # Componentes reutilizáveis (PostCard, StoryBar, OfflineBanner, etc.)
├── constants/theme.ts              # Paletas de cores (lightColors / darkColors), espaçamentos e raios
├── context/
│   ├── AuthContext.tsx             # Gestão de sessão híbrida (AsyncStorage + SecureStore)
│   └── ThemeContext.tsx            # Gestão e persistência do modo claro/escuro
├── data/mockData.ts                # Dados auxiliares locais (Stories, Perfil, Atividades)
├── hooks/
│   ├── useFetch.ts                 # Hook de requisições com estados e cache offline
│   ├── useOnline.ts                # Hook de conectividade com NetInfo
│   └── usePersistedState.ts        # Hook de estado sincronizado com AsyncStorage
├── services/
│   ├── api.ts                      # Cliente HTTP REST (GET e POST)
│   ├── cache.ts                    # Sistema de cache local com expiração (TTL)
│   ├── seguro.ts                   # Wrapper tipado do Expo SecureStore
│   └── storage.ts                  # Wrapper tipado do AsyncStorage
└── types/api.ts                    # Interfaces TypeScript das respostas da API
```

---

## Funcionalidades Implementadas

1. **Autenticação Persistente e Segura:** Login e cadastro com gravação do perfil no AsyncStorage e token simulado no SecureStore, mantendo a SplashScreen ativa até a hidratação da sessão no arranque.
2. **Consumo de API Real com 4 Estados de Tela:** Feed conectado à API REST exibindo estado de carregamento (`ActivityIndicator`), erro com opção de repetir, lista vazia e listagem com `FlatList` e pull-to-refresh (`RefreshControl`).
3. **Cache Offline com TTL e Deteção de Rede:** Armazenamento temporário das respostas da API (validade de 5 minutos) e banner automático (`OfflineBanner`) quando o dispositivo perde ligação à internet.
4. **Tema Dinâmico (Claro / Escuro):** Alternância instantânea nas Configurações com persistência automática entre sessões.
5. **Fluxo Completo de 12 Telas:** Navegação fluida entre abas, rotas dinâmicas (`/post/[id]` e `/story/[id]`), modal de criação (`POST`) e edição de perfil.

---

## Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento do Expo:
   ```bash
   npx expo start
   ```

3. Leia o QR Code com a aplicação Expo Go (iOS ou Android) ou abra num emulador.

