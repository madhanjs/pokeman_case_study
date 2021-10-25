import React from "react";
import { render } from "@testing-library/react";
import Attacks from "./Attacks";

const mockAttacks = [{ name: "Tackle", type: "Normal", damage: 7 }];

describe("Attacks Component", function () {
  it("should display attacks", function () {
    const { container, queryByText } = render(
      <Attacks attacks={mockAttacks} />
    );
    expect(queryByText("Tackle")).toBeInTheDocument();
    expect(queryByText("Normal")).toBeInTheDocument();
    expect(queryByText(7)).toBeInTheDocument();
    const attackTable = container.querySelector(".MuiTable-root");
    expect(attackTable.children.length).toEqual(2);
  });
});
