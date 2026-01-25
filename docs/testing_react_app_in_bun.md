# Tesing React app in bun

To test a React app using Bun, you need to install the necessary Testing Library packages and set up Happy DOM. After that, you can create a preload script for Happy DOM and extend Bun's expect function with Testing Library's matchers to write your tests.

## Setting Up Testing for React Apps in Bun

Bun is a fast JavaScript runtime that includes built-in support for testing React applications. To effectively test your React app using Bun, follow these steps:

### Prerequisites

Install Bun: Use the command below to install Bun on your system.

```
curl -fsSL https://bun.sh/install | bash
```

Create a React App: You can create a new React app with Bun using:

```
bun init --react
```

### Installing Required Packages

To use Testing Library with Bun, you need to install the following packages:

Happy DOM: This simulates a browser environment.

```
bun add -D @happy-dom/global-registrator
```

Testing Library: Install the necessary Testing Library packages.
bash

```
bun add -D @testing-library/react @testing-library/dom @testing-library/jest-dom
```

## Configuring Testing Environment

Create Preload Scripts: Set up a preload script for Happy DOM and Testing Library. Create a file named happydom.ts:

```
import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register();
```

Extend Expect: In another file, extend Bun's expect function with Testing Library matchers:

```
import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
    cleanup();
});
```

Update bunfig.toml: Add the preload scripts to your bunfig.toml:

```
[test]
preload = ["./happydom.ts", "./testing-library.ts"]
```

## Writing Tests

You can now write tests for your React components. Here’s a simple example:

```
import { test, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders MyComponent", () => {
    render(<MyComponent />);
    const element = screen.getByText(/some text/i);
    expect(element).toBeInTheDocument();
});
```

### Running Tests

To run your tests, use the following command:

```
bun test
```

This setup allows you to leverage Bun's speed and efficiency while testing your React applications effectively.
