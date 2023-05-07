import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { describe, it, expect } from "@jest/globals";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "Robusta",
    location: ["Cairo"],
    minimumQualifications: ["Vue.js"],
    ...jobProps,
  });

  const createConfig = (jobProps) => ({
    props: {
      job: {
        ...jobProps,
      },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Developer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Developer");
  });

  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Robusta" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Robusta");
  });

  it("renders job location", () => {
    const jobProps = createJobProps({ location: ["Cairo", "Alexandria"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Cairo");
    expect(wrapper.text()).toMatch("Alexandria");
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Vue.js", "CSS"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue.js");
    expect(wrapper.text()).toMatch("CSS");
  });

  it("links to individual job's page", () => {
    const jobProps = createJobProps({
      id: "35",
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    expect(jobPageLink.props("to")).toBe("/jobs/results/35");
  });
});
