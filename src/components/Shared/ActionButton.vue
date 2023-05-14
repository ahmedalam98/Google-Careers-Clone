<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "ActionButton",
  props: {
    // using prop validation to ensure that the text and type properties are passed in
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "primary",
      // adding custom validator to ensure that the type property is either primary or secondary
      validator: function (value) {
        return ["primary", "secondary"].includes(value);
      },
    },
  },

  setup(props) {
    const { type } = toRefs(props);

    const buttonClass = computed(() => {
      return {
        [type.value]: true,
      };
    });

    return {
      buttonClass,
    };
  },
};
</script>

<style scoped>
button {
  @apply px-5 py-3 font-semibold;
}

.primary {
  @apply rounded text-white bg-brand-blue-1 hover:shadow-blue;
}

.secondary {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>
