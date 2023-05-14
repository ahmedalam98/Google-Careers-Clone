import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";
import jest from "jest";

import { useStore } from "vuex";
jest.mock("vuex");

import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

describe("SubNav.vue", () => {
  // factory function to refactor repetitive code
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when  user is on job page", () => {
    it("displays the job count", () => {
      useConfirmRoute.mockReturnValue(true);

      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: "1" }, { id: "2" }],
        },
      });
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when  user is not on job page", () => {
    it("doesn't display the job count", () => {
      useConfirmRoute.mockReturnValue(false);
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [],
        },
      });
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
