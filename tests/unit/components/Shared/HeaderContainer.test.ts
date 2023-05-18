import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";

import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("allows parent component to provide title and subtitle content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: "<h1>Test Title</h1>",
        subtitle: "<h2>Sample subtitle</h2>",
      },
    });
    expect(wrapper.text()).toContain("Test Title");
    expect(wrapper.text()).toContain("Sample subtitle");
  });
});
