<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    // modelValue is the value that will be passed to the parent component
    modelValue: {
      type: String,
      required: true,
    },
  },
  // emits is used to define the events that the component can emit
  emits: ["update:modelValue"],
  methods: {
    // update:modelValue is the event that will be emitted, and $event is the value that will be passed to the parent component
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>
