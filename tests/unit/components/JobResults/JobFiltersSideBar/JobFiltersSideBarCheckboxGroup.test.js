import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";

describe("JobFiltersSideBarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Some Header",
      uniqueVallues: new Set(["Value A", "Value B"]),
      mutation: "Some Mutation",
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    const props = {
      useUniqueValues: new Set(["Full Time", "Part Time"]),
    };
    const wrapper = mount(JobFiltersSideBarCheckboxGroup, createConfig(props));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputs = inputLabels.map((node) => node.text());
    expect(inputs).toEqual(["Value A", "Value B"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const props = {
        mutation: "SOME_MUTATION",
        useUniqueValues: new Set(["Full Time"]),
      };
      const wrapper = mount(
        JobFiltersSideBarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full Time']");
      await fullTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", "Full Time");
    });

    it("navigates user to first page of jobs to see fresh batch of filtered jobs", async () => {
      useStore.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const props = {
        uniqueValues: new Set(["Full Time"]),
      };
      const wrapper = mount(
        JobFiltersSideBarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full Time']");
      await fullTimeInput.setChecked(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
