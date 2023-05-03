import nextElementInList from "@/utils/nextElementInList";
import { describe, it, expect } from "@jest/globals";

describe("nextElementInList", () => {
  it("locates element in list and returns the next element in list", () => {
    const list = ["a", "b", "c", "d"];
    const currentElement = "c";
    const nextElement = nextElementInList(list, currentElement);
    expect(nextElement).toBe("d");
  });

  describe("when current element is the last element in list", () => {
    it("returns the first element in list", () => {
      const list = ["a", "b", "c", "d"];
      const currentElement = "d";
      const nextElement = nextElementInList(list, currentElement);
      expect(nextElement).toBe("a");
    });
  });
});
