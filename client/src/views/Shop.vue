<template>
  <div id="app" class="bg-gray-100 min-h-screen flex flex-col">
    <body>
    <Header />
    <div class="md:w-[120rem] mx-auto py-8 justify-center">
      <div class="text-left pl-5">
        <h2 class="text-4xl  text-left">Boutique du Club</h2>
        <div class="w-1/4 h-1 bg-red-600 my-3 mr-10" ></div>
      </div>
      <div class="mx-auto py-8 md:flex justify-evenly">
        <Item title="T-Shirt" description="Tshirt floqué du club"
        price="10" imageSrc="https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/290596444_443536574446394_1991465983046796549_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PKyVcTH_wzAQ7kNvgGUo64H&_nc_ht=scontent-cph2-1.xx&oh=00_AYDlbfI-n0ZGcz8xcwbT_4s2j-0dJCM6XjdigyUeaZIK0g&oe=6671E023" />
        <Item title="Short" description="Short floqué du club"
        price="15" imageSrc="https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/290596444_443536574446394_1991465983046796549_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PKyVcTH_wzAQ7kNvgGUo64H&_nc_ht=scontent-cph2-1.xx&oh=00_AYDlbfI-n0ZGcz8xcwbT_4s2j-0dJCM6XjdigyUeaZIK0g&oe=6671E023" />
        <Item title="Protège Coude" description="Protection coude"
        price="5" imageSrc="https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/290596444_443536574446394_1991465983046796549_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PKyVcTH_wzAQ7kNvgGUo64H&_nc_ht=scontent-cph2-1.xx&oh=00_AYDlbfI-n0ZGcz8xcwbT_4s2j-0dJCM6XjdigyUeaZIK0g&oe=6671E023" />
      </div>
    </div>
    </body>
    <Footer />
  </div>
</template>

<script>
import Item from '../components/Item.vue';

export default {
  components: {
    Item,
  },
  data() {
    return {
      // Your data goes here
    };
  },
};
</script>