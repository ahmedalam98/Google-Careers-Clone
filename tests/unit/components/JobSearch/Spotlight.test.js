import { mount, flushPromises } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";
import axios from "axios";

jest.mock("axios");

import Spotlight from "@/components/JobSearch/Spotlight.vue";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "Random Image",
          tite: "Random Title",
          description: "Random Description",
          ...data,
        },
      ],
    });
  };

  it("provides img attribute to parent component", async () => {
    const data = { img: "Random Image" };
    mockSpotlightResponse({ data });
    const wrapper = mount(Spotlight, {
      slots: {
        default:
          '<template #default="slotProps"><h1>{{ slotProps.img }}</h1></template > ',
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Random Image");
  });

  it("provides title attribute to parent component", async () => {
    const data = { title: "Random Title" };
    mockSpotlightResponse({ data });
    const wrapper = mount(Spotlight, {
      slots: {
        default:
          '<template #default="slotProps"><h1>{{ slotProps.title }}</h1></template > ',
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Random Title");
  });

  it("provides description attribute to parent component", async () => {
    const data = { description: "Random Description" };
    mockSpotlightResponse({ data });
    const wrapper = mount(Spotlight, {
      slots: {
        default:
          '<template #default="slotProps"><h1>{{ slotProps.description }}</h1></template > ',
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Random Description");
  });
});
