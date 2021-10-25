import React from "react";
import { render, screen } from "@testing-library/react";
import { ArrowButton } from "./ArrowButton";

const mockHandleClick = jest.fn();

describe("ArrowButton Component", function () {
  it("should render backward arrow button", function () {
    const { getByTestId } = render(
      <ArrowButton type={"backward"} disabled={false} handleClick={mockHandleClick} />
    );
    expect(getByTestId("ArrowBackIosIcon")).toBeInTheDocument();
  });

  it("should render forward arrow button", function () {
    const { getByTestId } = render(
      <ArrowButton type={"forward"} disabled={false} handleClick={mockHandleClick} />
    );
    console.log(screen.debug());
    expect(getByTestId("ArrowForwardIosIcon")).toBeInTheDocument();
  });
});
