import { mount } from "@vue/test-utils";
import TextInput from "@/components/Shared/TextInput.vue";
import { describe, expect, it } from "@jest/globals";

describe("TextInput", () => {
  it("communiates that user has entered character", () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    // setValue is a helper function provided by vue-test-utils that sets the value of ""an input"" and triggers the input event.
    input.setValue("A");
    input.setValue("B");
    // emitted returns an array of arrays of arguments that were emitted with the event name passed in.
    const messages = wrapper.emitted(["update:modelValue"]);
    expect(messages).toEqual([["A"], ["B"]]);
  });
});
