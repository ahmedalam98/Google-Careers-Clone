import { describe, expect, it } from "@jest/globals";
import TextInput from "@/components/Common/TextInput.vue";
import { mount } from "@vue/test-utils";

describe("TextInput", () => {
  it("communicates that user has entered character", () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find("input");
    input.setValue("A");
    input.setValue("B");
    // emitted returns an array of arrays of arguments that were emitted with the event name passed in.
    const message = wrapper.emitted()["update:modelValue"]; // array of arrays with all emitted values from the key: "update:modelValue"
    expect(message).toEqual([["A"], ["B"]]);
  });
});
