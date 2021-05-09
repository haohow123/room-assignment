import { render, screen } from "@testing-library/react";
import Summary from "./Summary";
import React from "react";

test("renders Summary Text ", () => {
  render(<Summary people={4} roomsAmount={2} />);
  const summaryElement = screen.getByText(/住客人數：4 人 \/ 2 房/i);
  expect(summaryElement).toBeInTheDocument();
});
