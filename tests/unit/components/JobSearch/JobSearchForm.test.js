import { mount } from "@vue/test-utils";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import { describe, expect, it } from "@jest/globals";
import jest from "jest";

describe("JobSearchForm.vue", () => {
  describe("when user submits the form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = jest.fn();
      const $router = { push };

      const wrapper = mount(JobSearchForm, {
        global: {
          mocks: {
            $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("Cairo");

      const submitButton = wrapper.find("[data-test='submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "Cairo",
        },
      });
    });
  });
});
