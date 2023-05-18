import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";

import Accordion from "@/components/Shared/Accordion.vue";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Test",
    },
    slots: {
      default: "<h2>Test nested child</h2>",
    },
    ...config,
  });

  it("renders child", async () => {
    const slots = {
      default: "<h2>Test nested child</h2>",
    };
    const config = { slots };
    const wrapper = mount(Accordion, createConfig(config));
    expect(wrapper.text()).not.toMatch("Test nested child");
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("Test nested child");
  });

  describe("when we do not provide custom child content", () => {
    it("renders default content", async () => {
      const slots = {};
      const config = { slots };
      const wrapper = mount(Accordion, createConfig(config));
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("You forgot to populate me with content!");
    });
  });
});
