import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarCheckboxGroup.vue";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

jest.mock("vue-router");
jest.mock("vuex");
jest.mock("@/store/composables");

const useStoreMock = useStore as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Some Header",
      uniqueValues: new Set(["ValueA", "ValueB"]),
      mutation: "Some mutation",
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn() });
    /// here we mount and not shallowMount as we need to render the accordion component
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());
    expect(inputValues).toEqual(["ValueA", "ValueB"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit });
      useRouterMock.mockReturnValue({ push: jest.fn() });
      const props = {
        mutation: "SOME_MUTATION",
        uniqueValues: new Set(["Full-time"]),
      };

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setValue(true);
      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Full-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      useStoreMock.mockReturnValue({ commit: jest.fn() });
      const push = jest.fn();
      useRouterMock.mockReturnValue({ push });
      const props = {
        uniqueValues: new Set(["Full-time"]),
      };

      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const fullTimeInput = wrapper.find("[data-test='Full-time']");
      await fullTimeInput.setValue(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
