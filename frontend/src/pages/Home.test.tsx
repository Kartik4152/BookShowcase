import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "./Home";

const server = setupServer(
  rest.get(
    `${process.env.REACT_APP_BACKEND_URL}/books`,
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            title: "TestBook 1",
            description: "Description 1",
            image: "https://www.random.com/test.jpg",
            year: 2021,
          },
          {
            id: 2,
            title: "TestBook 2",
            description: "Description 2",
            image: "https://www.random.com/test.jpg",
            year: 2020,
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Check if we are receiving books", async () => {
  const component = render(<Home />);
  const list = await component.findByTestId("book-list");
  await waitFor(() => expect(list.children.length).toBe(2));
  expect(component.getByText(/TestBook 1/i)).toBeVisible();
  expect(component.getByText(/TestBook 2/i)).toBeVisible();
});
