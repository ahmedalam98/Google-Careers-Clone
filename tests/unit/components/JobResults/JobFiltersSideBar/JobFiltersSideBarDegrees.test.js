import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";
import jest from "jest";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueDegrees } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSideBarDegrees from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarDegrees.vue";

describe("JobFiltersSideBarDegrees", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of degrees for filtering jobs", async () => {
    useUniqueDegrees.mockReturnValue(new Set(["Bachelor's", "Master's"]));

    const wrapper = mount(JobFiltersSideBarDegrees, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const degreeLabels = wrapper.findAll("[data-test='degree']");
    const degrees = degreeLabels.map((node) => node.text());
    expect(degrees).toEqual(["Bachelor's", "Master's"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for degree", async () => {
      useUniqueDegrees.mockReturnValue(new Set(["Bachelor's", "Master's"]));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ name: "JobResults" });

      const wrapper = mount(JobFiltersSideBarDegrees, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const bachelorInput = wrapper.find('[data-test="Bachelor\'s"]');
      await bachelorInput.setChecked(true);

      expect(commit).toHaveBeenCalledWith("SET_DEGREE", "Bachelor's");
    });

    it("navigates user to first page of jobs to see fresh batch of filtered jobs", async () => {
      useUniqueDegrees.mockReturnValue(new Set(["Bachelor's", "Master's"]));
      useStore.mockReturnValue({ commit: jest.fn() });

      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobFiltersSideBarDegrees, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const bachelorInput = wrapper.find('[data-test="Bachelor\'s"]');
      await bachelorInput.setChecked(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
