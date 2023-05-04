import { describe, it, expect } from "@jest/globals";
import { shallowMount } from "@vue/test-utils";
import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav.vue", () => {
  it("displays company name", async () => {
    const wrapper = shallowMount(MainNav);
    //  setData() returns a promise, so we need to await it.
    await wrapper.setData({ companyName: "Google Careers" });
    expect(wrapper.text()).toMatch("Google Careers");
  });

  it("displays menu items for navigation", async () => {
    const wrapper = shallowMount(MainNav);
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
      const wrapper = shallowMount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  // we simulate a user clicking the login button and then we check if the profile image is displayed.
  describe("when user is logged in", () => {
    it("displays user profile image", async () => {
      const wrapper = shallowMount(MainNav);
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      // we need to re-find the profile image because the component has been updated so unfortunately if we don't re-find we get a reference to null node.
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("display subnavigation menu with additional information", async () => {
      const wrapper = shallowMount(MainNav);
      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(false);
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
