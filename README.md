# JavaScript Core — Lab 4

Laboratory work on JavaScript functions, closures, classes, inheritance and unit testing.

## Installation and tests

```bash
npm i
npm test
```

## Project structure

- `src/functions.js` — `unique`, `groupBy`, `chunk`, `deepClone`, `memoize`, `counter`.
- `src/Store.js` — `Store` and `SortedStore` classes.
- `tests/` — unit tests written with Vitest.
- `screenshots/` — screenshot of passed tests.

## Closures in my code

I used closures in the `memoize` and `counter` functions. In `memoize`, the returned function keeps access to the `cache` variable even after `memoize` has finished. This allows previous results to be saved and reused when the same arguments are passed again. In `counter`, the methods `inc`, `dec`, and `value` keep access to the local `count` variable. Code outside the function cannot change `count` directly. I think closures are useful when a function needs to remember its state without using a global variable. They also help keep internal data separate from the rest of the program.

## Test result

After running `npm test`, add the screenshot here as `screenshots/tests.png`.

![Passed Vitest tests](screenshots/tests.png)

## AI tools

I used ChatGPT to help understand the task, check the project structure and review examples of JavaScript and unit tests. I reviewed the code and can explain how the functions, closures, classes and tests work.
