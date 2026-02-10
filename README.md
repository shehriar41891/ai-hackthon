# AI Ecosona Hackathon Challenges

Progressive prompt engineering and prompt injection challenges. Each module is gated by solving the previous one.

## Modules

- **Module 1**: Find the code — prompt engineering basics (precise prompting, structured output).
- **Module 2**: Find the unique word — extraction from context.
- **Module 3**: Prompt injection awareness — discover the hidden instruction via the vulnerable chatbot.
- **Module 4**: Combined — code + injection to get the final code.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Start with Module 1.

## Configuration

Default answers are set in `lib/answers.ts`. Override with environment variables:

- `MODULE1_ANSWER` (default: `ECOSONA-7X9K`)
- `MODULE2_ANSWER` (default: `xenolith`)
- `MODULE3_ANSWER` (default: `UNLOCK-READY`)
- `MODULE4_ANSWER` (default: `ECOSONA-FINAL-42`)

Progress is stored in a cookie (`ecosona_progress`). Clear the cookie to reset.

## Build

```bash
npm run build
npm start
```
