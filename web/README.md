# bigfive-web

https://bigfive-test.com

Website for five factor model of personality based on work from [IPIP-NEO-PI](https://github.com/kholia/IPIP-NEO-PI).

Tests and evaluation is gathered from [ipip.ori.org](http://ipip.ori.org).

See it live @ [bigfive-test.com](https://bigfive-test.com)

The frontend is written in [nodejs](https://nodejs.org) using the
[Next.js](https://nextjs.org/) framework.

## Installation

Ensure you have installed [`mise`](https://mise.jdx.dev/), then run:

```
git clone https://github.com/auxesis/bigfive-web
cd bigfive-web
mise install
```

## Development

Copy `mise.local.toml.example` to `mise.local.toml` and fill in your Supabase credentials:

```toml
[env]
NEXT_PUBLIC_SUPABASE_URL = "https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "your-publishable-key"
```

Run the SQL in `web/src/db/schema.sql` in the [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) to create the required tables.

Install dependencies:

```
yarn install
```

Run the development server:

```
mise run dev
```

## Testing

Run linting and format checks:

```
mise run test
```

## Deploying

Apply database migrations:

```
supabase login
supabase link
supabase db push
```

## License

Licensed under the [MIT license](../LICENSE).
