---
name: testing
description: Write and organise tests for this Next.js portfolio using Vitest, React Testing Library and Playwright. Use when adding tests, setting up the test environment, deciding what to test, reviewing test quality, or configuring coverage and CI.
---

# Testing

## Principle

Test **what the user experiences**, not how the component is built. A test that breaks when you rename a state variable is a liability. A test that breaks when the contact form stops showing its error message is doing its job.

## Stack

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/user-event @testing-library/jest-dom \
  @vitest/coverage-v8
```

Playwright for end-to-end, only after the unit and integration layer exists.

Scripts to add:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"typecheck": "tsc --noEmit"
```

## Layout

Colocate tests next to the code: `Component.tsx` → `Component.test.tsx`. Shared setup in `src/test/setup.ts`, helpers and custom renders (with theme and i18n providers) in `src/test/utils.tsx`.

## Priority order for this portfolio

Highest value first — with a short deadline, stop when the time runs out, not when the list ends.

1. **Zod validation schemas** — pure functions, fast to test, real logic. Valid input, each invalid case, boundaries.
2. **Contact form** — renders, shows a validation error per field, submits valid data, shows success and error states, disables the button while submitting.
3. **Interactive terminal** — each command returns what it should, unknown commands are handled, history works.
4. **Language switcher** — changing locale changes the rendered copy and the `lang` attribute.
5. **Theme toggle** — switches and persists.
6. **Utilities** in `src/lib/` — `cn()` and anything with branching.
7. **Section components** — smoke tests that they render the data from `src/data/` without crashing. Low value; do these last.

## How to write them

```tsx
describe("ContactForm", () => {
  it("shows a validation error when the email is invalid", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ContactForm />);

    // Act
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /send/i }));

    // Assert
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });
});
```

Rules:

- Query by role first, then label, then text. `data-testid` is a last resort and needs a reason.
- `userEvent`, never `fireEvent`, for anything a human would do.
- One behaviour per test. The test name states the behaviour, not the function name.
- Mock only what crosses a boundary: `fetch`, Resend, `next/navigation`. Never mock the component under test.
- No snapshot tests of whole components — they pass without asserting anything meaningful.
- If a test needs to reach into implementation details to pass, the component probably needs splitting.

## Coverage

Aim for meaningful coverage, not a number. Around 70-80% on `src/lib` and `src/components` is a healthy target for this project; excluding `src/data`, type files and config from the report is fair and should be stated in the config.

Never write a test whose only purpose is to raise the percentage.

## CI

A GitHub Actions workflow on push and PR: install, lint, typecheck, test, build. It must be green before the README is allowed to mention CI at all.
