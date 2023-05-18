<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import axios from "axios";

// interface Spotlight {
//   id: number;
//   img: string;
//   title: string;
//   description: string;
// }

// <Spotlight[]>

export default defineComponent({
  name: "Spotlight",
  setup() {
    const spotlights = ref([]);

    const baseUrl = process.env.VUE_APP_API_URL;
    const url = `${baseUrl}/spotlights`;
    const getSpotlights = async () => {
      const response = await axios.get(url);

      spotlights.value = response.data;
    };
    onMounted(getSpotlights);
    return { spotlights };
  },
});
</script>
