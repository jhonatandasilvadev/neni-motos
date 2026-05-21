# Neni Motos

Catálogo online de motos para Neni Motos em Joinville, SC.

## Stack
- React
- TypeScript
- Vite
- Chakra UI
- React Router
- Supabase (banco, auth, storage)
- Vercel (deploy)

## Rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env` baseado em `.env.example` com suas chaves do Supabase:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

3. Execute o projeto:

```bash
npm run dev
```

4. Acesse `http://localhost:5173`

## Supabase

### Criar projeto
1. Acesse https://supabase.com e crie um novo projeto.
2. Copie a URL do projeto e a chave de anon no painel de configurações.
3. Cole em `.env` como `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

### Rodar schema
No SQL editor do Supabase, execute o conteúdo de `supabase/schema.sql`.

### Criar bucket
1. No painel do Supabase, acesse Storage.
2. Crie um bucket chamado `motorcycle-images`.
3. Defina como público se desejar permitir imagens sem autenticação.

## Rotas do app
- `/` - Home pública
- `/moto/:id` - Página de detalhes da moto
- `/localizacao` - Localização e contato
- `/admin` - Painel administrativo
- `/admin/motos` - Lista de motos
- `/admin/motos/nova` - Cadastro de nova moto
- `/admin/motos/:id/editar` - Edição de moto
- `/admin/configuracoes` - Configurações da loja

## Como usar o admin
- O painel administrativo depende do Supabase Auth.
- Para fazer login, crie um usuário no painel de autenticação do Supabase.
- Depois de logado, você poderá gerenciar motos, editar status e atualizar as configurações da loja.

## Políticas RLS / MVP
Para um MVP, você pode deixar as tabelas sem Row Level Security (RLS) ou criar regras abertas para leitura pública.

Políticas recomendadas:
- `motorcycles` - leitura pública para a página do catálogo
- `motorcycle_images` - leitura pública para carregar imagens
- `store_settings` - leitura pública para texto e contato
- `auth.users` - proteger criação/edição/exclusão por usuários autenticados

### Próximos passos de segurança
- Habilitar RLS apenas para tabelas administrativas
- Criar políticas específicas para `update`, `insert` e `delete`
- Usar funções de serviço para uploads e operações sensíveis
- Guardar a chave de serviço apenas no backend ou em funções de edge, nunca no frontend
- Habilitar autenticação de dois fatores para contas administrativas

## Layout e estilo
- Tema escuro com detalhes dourados
- Cards de motos com estilo premium
- Mobile-first e responsivo
- Botões de WhatsApp e redes sociais integrados

## Observações
- Se o Supabase não estiver configurado, o site usa dados mockados para a home e catálogo.
- Para imagens, use o bucket `motorcycle-images` e configure o storage corretamente.
