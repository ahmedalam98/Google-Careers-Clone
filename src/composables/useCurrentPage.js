import { computed } from "vue";
import { useRoute } from "vue-router";

const useCurrentPage = () => {
  const route = useRoute();
  return computed(() => Number.parseInt(route.query.page || "1"));
};

export default useCurrentPage;
