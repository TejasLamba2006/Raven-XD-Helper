# Raven XD Helper

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Format

```toml
[unique-name]
keyphrases = ["lowercase phrase to match"]
content = """
Supports easy
Multi line strings
"""
reply = true # reply or just send a message
mention = true # mention author, if replying
```
