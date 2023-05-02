import { mount } from "@vue/test-utils";
import ActionButton from "@/components/ActionButton.vue";
import { describe, expect, it } from "@jest/globals";

describe("ActionButton.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = mount(ActionButton, {
      props: {
        text: msg,
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch(msg);
  });
  it("applies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
