import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom";
import Pet from "../Pet";

test("display a default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );
  const petThumbnail = await pet.findAllByTestId("thumbnail");

  expect(petThumbnail.src).toContain("none.jpg");
});
