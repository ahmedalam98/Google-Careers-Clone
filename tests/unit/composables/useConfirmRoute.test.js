import useConfirmRoute from "@/composables/useConfirmRoute";
import { describe, expect, it } from "@jest/globals";

import { useRoute } from "vue-router";

jest.mock("vue-router");

describe("useConfirmRoute.js", () => {
  it("determines if page route matches specified route", () => {
    useRoute.mockReturnValue({
      name: "Home",
    });
    const routeName = "Home";
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true);
  });
});
