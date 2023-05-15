import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";
import jest from "jest";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueOrganizations } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";

describe("JobFiltersSideBarOrganizations", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of organizations for filtering jobs", async () => {
    useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));

    const wrapper = mount(JobFiltersSideBarOrganizations, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organization", async () => {
      useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ name: "JobResults" });

      const wrapper = mount(JobFiltersSideBarOrganizations, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked(true);

      expect(commit).toHaveBeenCalledWith("SET_ORGANIZATION", "Google");
    });

    it("navigates user to first page of jobs to see fresh batch of filtered jobs", async () => {
      useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
      useStore.mockReturnValue({ commit: jest.fn() });

      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobFiltersSideBarOrganizations, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const googleInput = wrapper.find("[data-test='Google']");
      await googleInput.setChecked(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
