<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
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
  // computed ---> object that contains the primary class if the primary data property is true, and no class if it is false.
  computed: {
    buttonClass() {
      return {
        // dynamic object property to add whatever class matched below in <style/> to the button element
        [this.type]: true,
      };
    },
  },
};
</script>

<style scoped>
button {
  @apply px-5 py-3 rounded font-medium;
}

.primary {
  @apply text-white bg-brand-blue-1 hover:shadow-blue;
}

.secondary {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>
