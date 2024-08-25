<template>
  <!-- Navbar -->
  <nav class="bg-[#1a1a18] flex items-center justify-center w-full" ref="navbar">
    <div class="container mx-auto flex flex-col items-center transition-all">
      <div class="flex items-center fixed top-0 bg-[#1a1a18] w-full justify-center z-50" ref="header">
        <!-- Logo -->
        <div class="relative text-white font-bold text-xl transition-all z-50 w-full" ref="title">
          <div v-if="!isMobile" class="absolute text-red-600 left-0 pl-16">
            <p>Reprise des cours le 9 Septembre</p>
          </div>
          <div class="flex justify-center">
            <a href="/" class="text-center">Garuda Muay Thaï Lille</a>
          </div>
        </div>
        <div class="absolute end-0 transition-all z-50">
          <!-- Render hamburger menu for mobile -->
          <button id="mobileNav" v-if="isMobile" @click="toggleMenu" :class="{ 'open': isOpen }" class="block md:hidden text-white p-2 z-50 top-0">
            <svg class="h-6 w-6 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <SocialMediaButtons v-if="!isMobile" />
        </div>
      </div>
      <!-- Image -->
      <img v-if="!isLanding" src="../assets/logo.png" alt="Logo" class="h-80 mb-2 transition-all z-0" ref="logo"/>
    </div>
  </nav>
  
  <ul class="z-40 flex relative transition-all sticky top-[0px] bg-[#1a1a18] items-center justify-center w-full font-bold
  md:space-x-4
  max-sm:bg-[#1a1a18]/95 max-sm:fixed max-sm:top-[0px] max-sm:left-0 max-sm:h-[110%] max-sm:w-full max-sm:flex-col max-sm:transform max-sm:transition-transform max-sm:duration-300"
  :class="{
      'translate-y-0': isOpen, 
      'translate-y-[110%]': !isOpen && isMounted,
      'translate-y-full': !isMounted,
    }"  ref="links">
    <div v-if="isMobile" class="text-red-600 text-xl absolute w-full top-[25%]">
              <p class="text-center">Reprise des cours le 9 Septembre</p>
            </div>
    <!-- <ul class="z-50 flex transition-all sticky top-[28px] bg-[#1a1a18] items-center justify-center w-full font-bold
    md:space-x-4
    max-sm:bg-[#1a1a18]/95 max-sm:fixed max-sm:top-[28px] max-sm:left-0 max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:transform max-sm:transition-transform max-sm:duration-300"
    :class="{ 'translate-y-0': isOpen, 'translate-y-full': !isOpen }" ref="links"> -->
    <li class="max-sm:text-xl max-sm:w-full max-sm:text-center"><a href="/home" class="text-white hover:text-gray-200 transition-all">Le club</a></li>
    <li class="max-sm:text-xl max-sm:w-full max-sm:text-center"><a href="/#inscription" class="text-white hover:text-gray-200 transition-all">Inscription</a></li>
    <li class="max-sm:text-xl max-sm:w-full max-sm:text-center"><a href="/#infos" class="text-white hover:text-gray-200 transition-all">Informations</a></li>
    <li class="max-sm:text-xl max-sm:w-full max-sm:text-center"><a href="/shop" class="text-white hover:text-gray-200 transition-all">Boutique</a></li>
    <SocialMediaButtons v-if="isMobile" class="absolute bottom-20"/>
  </ul>
</template>

<script>
import SocialMediaButtons from './Socials.vue'; // Import the SocialMediaButtons component

export default {
  data() {
    return {
      isLanding: false,
      isMobile: false,
      isOpen: false,
      isMounted: false,
    };
  },
  props: ['isLanding'],
  mounted() {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
    const titleHeight = this.$refs.title.offsetHeight;
    this.$refs.links.style.marginTop = `-${titleHeight}px`;
    if (this.$refs.logo) {
      this.$refs.logo.style.paddingTop = `${titleHeight}px`;
    } else {
      this.$refs.navbar.classList.add('sticky');
      this.$refs.navbar.classList.add('top-0');
      this.$refs.navbar.classList.add('z-50');
      this.$refs.header.classList.add('sticky');
      this.$refs.header.classList.add('top-0');
    }
    if (this.isMobile) {
      this.$refs.links.classList.add('hidden');
    }
    this.isMounted = true;
  },
  destroyed() {
  },
  methods: {
    toggleMenu() {
      //if mobilenav element is not to the top of the screen, scroll until it is
      if (document.getElementById('mobileNav').getBoundingClientRect().top > 0) {
        window.scrollTo({
          top: window.scrollY + document.getElementById('mobileNav').getBoundingClientRect().top,
          behavior: 'smooth'
        });
      }
      const links = this.$refs.links;
      links.classList.toggle('hidden');
      this.isOpen = !this.isOpen; // Toggle isOpen state
      document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
    },
  },
  components: {
    SocialMediaButtons, // Register the SocialMediaButtons component
  },
};
</script>

<style>
/* Your component styles go here */
.open {
  transform: rotate(-180deg); /* Rotate the icon when menu is open */
}
</style>
