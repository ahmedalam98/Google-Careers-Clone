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
export default {
  name: "Accordion",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
