import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    count: 123,
  }),
  // 启用持久化
  persist: {
    storage: localStorage, // 使用 localStorage
    key: 'my-cart-store', // 自定义 key 名称
    paths: ['count'], // 只持久化部分字段
  },
  actions: {
    addItem(product) {
      this.items.push(product);
      this.total += product.price;
    },
    removeItem(index) {
      const removedItem = this.items.splice(index, 1)[0];
      this.total -= removedItem.price;
    },
  },
});
