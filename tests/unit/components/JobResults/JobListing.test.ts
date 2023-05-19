import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { describe, it, expect } from "@jest/globals";

import { createJob } from "../../store/utils";
import { Job } from "@/api/types";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    props: {
      job: {
        ...job,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const job = createJob({ title: "Vue Developer" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Vue Developer");
  });

  it("renders job organization", () => {
    const job = createJob({ organization: "Robusta" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Robusta");
  });

  it("renders job location", () => {
    const job = createJob({ locations: ["Cairo", "Alexandria"] });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Cairo");
    expect(wrapper.text()).toMatch("Alexandria");
  });

  it("renders job qualifications", () => {
    const job = createJob({
      minimumQualifications: ["Vue.js", "CSS"],
    });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Vue.js");
    expect(wrapper.text()).toMatch("CSS");
  });

  it("links to individual job's page", () => {
    const job = createJob({
      id: 35,
    });
    const wrapper = mount(JobListing, createConfig(job));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    expect(jobPageLink.props("to")).toBe("/jobs/results/35");
  });
});
