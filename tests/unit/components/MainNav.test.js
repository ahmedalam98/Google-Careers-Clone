import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav.vue", () => {
  it("displays company name", async () => {
    const wrapper = mount(MainNav);
    // artificially setting the data of the component, And I'm using await because I want to wait for the component to update
    // not a big fan of this approach, but it's possible
    await wrapper.setData({ companyName: "Google Careers" });
    expect(wrapper.text()).toMatch("Google Careers");
  });

  it("displays menu items for navigation", async () => {
    const wrapper = mount(MainNav);
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
      const wrapper = mount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user is logged in", () => {
    it("displays user profile image", async () => {
      const wrapper = mount(MainNav);
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      // we need to re-find the profile image because the component has been updated so unfortunately if we don't re-find we get a reference to null node.
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
  });
});
