# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Start Local Redis

```bash
brew tap redis-stack/redis-stack
brew install redis-stack

# To start Redis
redis-stack-server

# To connect to your local Redis server and execute commands
redis-cli

# open rbook at localhost:3050
# enter host=localhost, port=6379, password blank
npx rbook
```

Starting sandbox from the route folder

```bash
npm run sandbox
```

## Populate Fake Data

- Some fields can be sortable: `name`, `endingAt`, `views`, `likes`, `price`, `bids`
- Some fields are not sortable: `description`, `ownerId`

```bash
npm run seed
```

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
