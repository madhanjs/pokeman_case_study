import React from "react";
import { render } from "@testing-library/react";
import { Attacks } from "./Attacks";

const mockAttacks = [{name: "Tackle", type: "Normal", damage: 7}]

describe("Attacks Component", function () {
  it("should display attacks", function () {
    let { getByText } = render(<Attacks attacks={mockAttacks}/>);
    expect(getByText("Hello world React!")).toMatchInlineSnapshot(`
      <h1>
        Hello world React!
      </h1>
    `);
  });
});
