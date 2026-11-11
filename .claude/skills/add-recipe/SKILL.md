---
name: add-recipe
description: Add a new recipe to the À Table site, including its data entry, two photos, and verification. Use when the user asks to add, create or write a recipe for the collection.
---

# Add a recipe to À Table

The full procedure is in `AGENTS.md` at the repo root, under **Adding a recipe**.
Read that section and follow it. It covers the data fields, content rules, photos,
verification and the report.

Claude-specific notes:

- For the photo, use the image generation skill available in this session, or a
  photo whose reuse permission you have verified. Save it as
  `dist/images/<id>.webp`, then run `npm run thumbs -- <id>`.
- Run `npm test` and `npm run test:offline` from the repo root, then check the
  recipe in a browser as described in `AGENTS.md`.
- Do not commit or push unless the user asks.
