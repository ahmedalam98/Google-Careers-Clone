import { shallowMount } from "@vue/test-utils";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import { describe, it, expect } from "@jest/globals";

describe("ProfileImage.vue", () => {
  it("displays user profile image", () => {
    const wrapper = shallowMount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
