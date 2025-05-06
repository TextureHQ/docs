# Texture

These are the docs for [Texture](https://www.texturehq.com), the industry cloud for energy.

They are hosted here: [https://docs.texturehq.com](https://docs.texturehq.com)

## Contributing

While these docs are created by Texture employees and they are official docs, we are happy to accept pull requests and contributions from the community.

See something that's not quite right? Have a suggestion? Open an issue or submit a PR! Someone from the Texture team will review it and merge it in.

### Local Development

```
$ yarn # install dependencies
$ cp .env.example .env # copy example environment variables
$ yarn start # start the local development server
```

This site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Analytics

This site uses both Vercel Analytics and PostHog for tracking user behavior:

- Vercel Analytics is automatically configured through the `@vercel/analytics` package
- PostHog requires environment variables to be set in the `.env` file:
  - `REACT_APP_PUBLIC_POSTHOG_KEY`: Your PostHog project API key
  - `REACT_APP_PUBLIC_POSTHOG_HOST`: The PostHog instance URL (usually https://us.i.posthog.com)

These analytics tools help us understand how users interact with our documentation, allowing us to make improvements based on actual usage patterns.
