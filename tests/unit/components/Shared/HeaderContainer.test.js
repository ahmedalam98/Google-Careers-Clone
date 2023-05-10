import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";

import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer.vue", () => {
  it("allows parend component to provide title content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: "<h1>Test Title</h1>",
      },
    });
    expect(wrapper.text()).toMatch("<h1>Test Title</h1>");
  });

  it("allows parent component to provide subtitle content", () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: "<h2>Test Subtitle</h2>",
      },
    });
    expect(wrapper.text()).toMatch("<h2>Test Subtitle</h2>");
  });
});
