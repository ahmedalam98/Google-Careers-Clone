import HeadLine from "@/components/JobSearch/HeadLine.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

describe("HeadLine", () => {
  beforeEach(() => {
    jest.useFakeTimers("legacy"); // it will replace the js-timer-functions (setTimeout, setInterval, clearTimeout, clearInterval) with mock functions
  });
  afterEach(() => {
    jest.useRealTimers(); // to restore the original behavior of the js-timer-functions
  });

  it("displays intorductory action verb", () => {
    const wrapper = mount(HeadLine);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
  });

  it("changing action verb at a consistent interval", () => {
    mount(HeadLine);
    expect(setInterval).toHaveBeenCalled();
  });

  it("swaps action verb after first interval", async () => {
    const wrapper = mount(HeadLine);
    // move forward to the next interval
    jest.runOnlyPendingTimers(); // it simulates the running of timer and it will run the next timer in the queue (in this case the setInterval) and then stop

    // now we have to tell the component (wrapper.vm) to refresh the DOM
    await nextTick(); // wait for the DOM updates with the next action verb ('Create') and then continue with the test
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Create for everyone");
  });

  it("removes interval when component disappear", () => {
    const wrapper = mount(HeadLine);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
