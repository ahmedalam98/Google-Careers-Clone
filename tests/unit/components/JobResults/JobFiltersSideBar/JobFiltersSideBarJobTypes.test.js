import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";
import jest from "jest";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import { useUniqueJobTypes } from "@/store/composables";
jest.mock("@/store/composables");

import JobFiltersSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarJobTypes.vue";

describe("JobFiltersSideBarJobTypes", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    useUniqueJobTypes.mockReturnValue(new Set(["Full Time", "Part Time"]));

    const wrapper = mount(JobFiltersSideBarJobTypes, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const jobTypeLabels = wrapper.findAll("[data-test='jobType']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full Time", "Part Time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      useUniqueJobTypes.mockReturnValue(new Set(["Full Time", "Part Time"]));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ name: "JobResults" });

      const wrapper = mount(JobFiltersSideBarJobTypes, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full Time']");
      await fullTimeInput.setChecked(true);

      expect(commit).toHaveBeenCalledWith("SET_JOB_TYPE", "Full Time");
    });

    it("navigates user to first page of jobs to see fresh batch of filtered jobs", async () => {
      useUniqueJobTypes.mockReturnValue(new Set(["Full Time", "Part Time"]));
      useStore.mockReturnValue({ commit: jest.fn() });

      const push = jest.fn();
      useRouter.mockReturnValue({ push });

      const wrapper = mount(JobFiltersSideBarJobTypes, createConfig());
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full Time']");
      await fullTimeInput.setChecked(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
