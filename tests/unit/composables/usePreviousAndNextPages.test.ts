import { describe, expect, it } from "@jest/globals";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

describe("usePreviousAndNextPages", () => {
  it("calculates page before current page", () => {
    const currentPage = { value: 2 };
    const maxPage = { value: 3 };
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(1);
  });

  describe("when current page is the first page", () => {
    it("does not calculate a page before current page", () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates page after current page", () => {
    const currentPage = { value: 2 };
    const maxPage = { value: 3 };
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(3);
  });

  describe("when current page is the last page", () => {
    it("does not calculate a page after current page", () => {
      const currentPage = { value: 3 };
      const maxPage = { value: 3 };
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
