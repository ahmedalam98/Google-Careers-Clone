import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";
import jest from "jest";

import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";

describe("JobFiltersSideBarOrganizations", () => {
  const createConfig = ($store) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it("renders unique list of organizations for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
      },
    };
    const wrapper = mount(JobFiltersSideBarOrganizations, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const organizationLabels = wrapper.findAll("[data-test='organization']");
    const organizations = organizationLabels.map((node) => node.text());
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  it("communicates that user has selected checkbox for organization", async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
      },
      commit,
    };
    const wrapper = mount(JobFiltersSideBarOrganizations, createConfig($store));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const googleInput = wrapper.find("[data-test='Google']");
    await googleInput.setChecked(true);

    expect(commit).toHaveBeenCalledWith("SET_ORGANIZATION", "Google");
  });
});
