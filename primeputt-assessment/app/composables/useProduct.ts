import { computed } from "vue";
import { sizes, formatPrice } from "../data/products";

export function useProduct() {
  const selectedSize = useState<string>("primeputt-selected-size", () => "XL");

  const selectedProduct = computed(() => {
    return sizes.find((size) => size.name === selectedSize.value) ?? sizes[1]!;
  });

  function selectSize(name: string) {
    if (sizes.some((size) => size.name === name)) {
      selectedSize.value = name;
    }
  }

  return {
    sizes,
    selectedSize,
    selectedProduct,
    selectSize,
    formatPrice,
  };
}
