<template>
  <div id="app" class="bg-gray-100 min-h-screen flex flex-col">
    <Header />
    <div class="md:w-[120rem] mx-auto py-8 justify-center">
      <div class="text-left pl-5">
        <h2 class="text-4xl text-left">Boutique du Club</h2>
        <div class="w-1/4 h-1 bg-red-600 my-3 mr-10"></div>
      </div>
      <div class="mx-auto py-8 md:flex justify-evenly" id="shop">
        <Item 
          v-for="item in items" 
          :key="item.id"
          :title="item.name" 
          :description="item.description" 
          :price="item.price" 
          :imageSrc="item.image"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Item from '../components/Item.vue';
import axios from 'axios';

export default {
  components: {
    Item,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    axios.get(this.$hostname + '/shop/items')
      .then((response) => {
        this.items = response.data.data.items;
        console.log('Items:', this.items);
        this.items.forEach((item, index) => {
          axios.get(this.$hostname + '/shop/image/' + item.id, { responseType: 'blob' })
            .then((response) => {
              const imageUrl = URL.createObjectURL(response.data);
              // Directly updating the item image property
              this.items[index].image = imageUrl;
              this.$forceUpdate(); // Force re-render to ensure Vue notices the change
            })
            .catch((error) => {
              console.error('Error fetching image:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  },
};
</script>
