import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import { jest } from "jest";
import { describe, it, expect, afterEach, beforeEach } from "@jest/globals";

import axios from "axios";
// mocking axios module and its methods, properties.
jest.mock("axios");

import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  beforeEach(() => {
    // data: Array(10).fill({}) creates an array of 10 empty objects to avoid mocking the actual data structure.
    axios.get.mockResolvedValue({ data: Array(10).fill({}) });
  });

  afterEach(() => {
    // reset the mock of axios to fix test pollution
    axios.get.mockReset();
  });

  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const createConfig = ($route) => ({
    global: {
      mocks: {
        $route,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("fetches jobs", () => {
    const $route = createRoute();
    shallowMount(JobListings, createConfig($route));
    // checking if axios.get method has been called with the correct url.
    expect(axios.get).toHaveBeenCalled("http://myFakeApi.com/jobs");
  });

  it("creates a job listing for a maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(10).fill({}) });
    const queryParams = { page: "1" };
    const $route = createRoute(queryParams);
    const wrapper = shallowMount(JobListings, createConfig($route));
    // the component is using axios.get method to fetch data.So, we need to wait for the promise to resolve.
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const queryParams = { page: "5" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when user is on first page of job results", () => {
    it("doesn't show link to previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("shows link to next page", async () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });

    describe("when user is on last page of job results", () => {
      it("does not show link to next page", async () => {
        axios.get.mockResolvedValue({ data: Array(10).fill({}) });
        const queryParams = { page: "2" };
        const $route = createRoute(queryParams);
        const wrapper = shallowMount(JobListings, createConfig($route));
        await flushPromises();
        const nextPage = wrapper.find("[data-test='next-page-link']");
        expect(nextPage.exists()).toBe(false);
      });

      it("shows link to previous page", async () => {
        axios.get.mockResolvedValue({ data: Array(10).fill({}) });
        const queryParams = { page: "2" };
        const $route = createRoute(queryParams);
        const wrapper = shallowMount(JobListings, createConfig($route));
        await flushPromises();
        const previousPage = wrapper.find("[data-test='previous-page-link']");
        expect(previousPage.exists()).toBe(true);
      });
    });
  });
});
