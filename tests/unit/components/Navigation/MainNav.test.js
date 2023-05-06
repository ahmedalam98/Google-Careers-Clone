import { describe, it, expect } from "@jest/globals";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav.vue", () => {
  // Refactoring Test Suite Method 1) :
  //-----> to preserve the return of the wrapper and have access to it as soon as the before each function.So, we can reference it in every test
  //-----> we ensure there's no pollution between tests because every new test we just create a new wrappe, the reference to wrapper keeps changing as a brand new component
  // let wrapper;

  // Refactoring Test Suite Method 2) :
  // -----> pure vanilla funtion returns the repeatable part to make it more readable code if there's a lot of tests.
  const createConfig = () => {
    return {
      global: {
        mocks: {
          $route: {
            name: "JobResults",
          },
        },
        stubs: {
          // RouterLinkStub : needed to stub the router-link component as a common problem because it is not available in the test environment.
          // If we use a normal stub the test suite won't detect the text inside the router-link component.
          // for example the test suite replace it with a <div/> and the text will be lost.So we need to use RouterLinkStub to make sure that the text is still there.
          "router-link": RouterLinkStub,
        },
      },
    };
  };

  it("displays company name", () => {
    const wrapper = shallowMount(MainNav, createConfig());
    expect(wrapper.text()).toMatch("Google Careers");
  });

  it("displays menu items for navigation", async () => {
    const wrapper = shallowMount(MainNav, createConfig());
    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Location",
      "Benefits",
      "Jobs",
      "Students",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = shallowMount(MainNav, createConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  // we simulate a user clicking the login button and then we check if the profile image is displayed.
  describe("when user is logged in", () => {
    it("displays user profile image", async () => {
      const wrapper = shallowMount(MainNav, createConfig());
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      // we need to re-find the profile image because the component has been updated so unfortunately if we don't re-find we get a reference to null node.
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("display subnavigation menu with additional information", async () => {
      const wrapper = shallowMount(MainNav, createConfig());
      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(false);
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
