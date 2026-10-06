# Blog posts

Drop one JSON file per article in this folder: `{slug}.json`.

- Filenames starting with `_` are templates only and are **not** published.
- Preserve the WordPress slug in `slug` and `legacyUrl` when migrating.
- See `_example.post.json` for the field shape.

At audit time (October 2026) the live site had **0** public WordPress posts
(`wp/v2/posts` returned an empty list). Do not invent articles.
