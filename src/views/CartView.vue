<template>
  <div>
    <h2>购物车2</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - ¥{{ item.price }}
        <button @click="removeItem(index)">删除</button>
      </li>
    </ul>
    <p>总价：¥{{ total }}</p>
    <button @click="addItem">添加商品</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { storeToRefs } from 'pinia';

const cart = useCartStore();
const { items, total } = storeToRefs(cart);

function addItem() {
  cart.addItem({ name: '商品' + Date.now(), price: Math.random() * 100 });
}
function removeItem(index) {
  cart.removeItem(index);
}
</script>
