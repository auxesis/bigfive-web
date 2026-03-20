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
cd bigfive-web/web
mise install
```

## Development

Install app dependencies:

```
mise run setup
```

Start the database:

```
mise run db:start
```

Apply database migrations:

```
mise run db:migrate
```

Run the development server:

```
mise run dev
```

## Testing

Run all the tests (linting, formatting, unit, integration):

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
