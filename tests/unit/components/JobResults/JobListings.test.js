import { flushPromises, shallowMount } from "@vue/test-utils";
import { jest } from "jest";
import { describe, it, expect } from "@jest/globals";

import axios from "axios";
// mocking axios module and its methods, properties.
jest.mock("axios");

import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  it("fetches jobs", () => {
    // simulate the Async process by mocking axios.get method to return a promise that resolves to an empty array.
    axios.get.mockResolvedValue({ data: [] });
    shallowMount(JobListings);
    // checking if axios.get method has been called with the correct url.
    expect(axios.get).toHaveBeenCalled("http://localhost:3000/jobs");
  });

  it("creates a job listing for each job", async () => {
    // data: Array(10).fill({}) creates an array of 10 empty objects to avoid mocking the actual data structure.
    axios.get.mockResolvedValue({ data: Array(10).fill({}) });
    const wrapper = shallowMount(JobListings);
    // the component is using axios.get method to fetch data.So, we need to wait for the promise to resolve.
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });
});
