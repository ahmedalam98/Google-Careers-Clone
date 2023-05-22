import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarSkills.vue";
import { shallowMount } from "@vue/test-utils";
import { useStore } from "vuex";

jest.mock("vuex");

const useStoreMock = useStore as jest.Mock;

xdescribe("JobFiltersSidebarSkills", () => {
  const createConfig = (props = {}) => ({
    props: {
      header: "Some Header",
      ...props,
    },
  });

  it("populates search input from store", async () => {
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "Programmer",
      },
      commit: jest.fn(),
    });
    const wrapper = shallowMount(JobFiltersSidebarSkills, createConfig());
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input']");
    const inputElement = skillsSearchInput.element as HTMLInputElement;
    expect(inputElement.value).toBe("Programmer");
  });

  it("tells store that the user has entered skills search term", async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "Programmer",
      },
      commit,
    });
    const wrapper = shallowMount(JobFiltersSidebarSkills, createConfig());
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input']");
    await skillsSearchInput.setValue("Vue Developer");
    expect(commit).toHaveBeenCalledWith(
      "UPDATE_SKILLS_SEARCH_TERM",
      "Vue Developer"
    );
  });
});
