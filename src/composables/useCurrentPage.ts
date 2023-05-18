import { computed } from "vue";
import { useRoute } from "vue-router";

const useCurrentPage = () => {
  const route = useRoute();
  const page = route.query.page as string;
  return computed(() => Number.parseInt(page || "1"));
};

export default useCurrentPage;
