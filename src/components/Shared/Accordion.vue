<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="toggleAccordion"
      data-test="clickable-area"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="w-full mt-5">
      <!--slots are used to pass dynamic content to the component from the parent component-->
      <slot>
        <h2>You forgot to populate me with content!</h2>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "Accordion",

  props: {
    header: {
      type: String,
      required: true,
    },
  },

  setup() {
    const isOpen = ref(false);
    const toggleAccordion = () => {
      isOpen.value = !isOpen.value;
    };
    const caretIcon = computed(() => {
      return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
    });

    // the following return statement is the main difference between the setup() and the data() method.
    // As to use any of the above variables in the template we need to return them from the setup() method
    return {
      isOpen,
      toggleAccordion,
      caretIcon,
    };
  },
};
</script>
