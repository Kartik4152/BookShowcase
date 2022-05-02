import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";
import { rest } from "msw";

import { setupServer } from "msw/node";

const books = [
  {
    id: "1",
    title: "TestBook 1",
    description: "Description 1",
    image: "https://www.random.com/test.jpg",
    year: 2021,
  },
  {
    id: "2",
    title: "TestBook 2",
    description: "Description 2",
    image: "https://www.random.com/test.jpg",
    year: 2020,
  },
];

const server = setupServer(
  rest.get(
    `${process.env.REACT_APP_BACKEND_URL}/books`,
    (req, res, ctx) => {
      return res(ctx.json(books));
    }
  ),
  rest.get(
    `${process.env.REACT_APP_BACKEND_URL}books/1`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: "1",
          title: "TestBook 1",
          description: "Description 1",
          image: "https://www.random.com/test.jpg",
          year: 2021,
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("full app rendering/navigating", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(screen.getByText(/Book Catalogue/i)).toBeInTheDocument();
  const leftClick = { button: 0 };
  await waitFor(() =>
    expect(screen.getByText(/TestBook 1/i)).toBeInTheDocument()
  );
  userEvent.click(screen.getByText(/TestBook 1/i), leftClick);

  // check that the content changed to the new page
  await waitFor(() =>
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument()
  );
});
