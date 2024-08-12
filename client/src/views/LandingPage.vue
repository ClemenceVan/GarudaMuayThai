<template>
  <div class="w-full">
    <div class="relative bg-[#1a1a18] min-h-dvh md:flex p-5 h-dvh md:z-auto w-dvh justify-evenly max-h-dvh max-sm:items-center max-sm:flex-col">
      <img v-if="!isMobile" src="@/assets/logo.png" alt="Logo" class="h-2/3 mb-2 m-10" ref="logo" />
      <div class="">
        <div class="">
          <transition name="slide">
            <p v-if="isVisible" class="text-white text-right text-8xl md:text-8xl font-bebas-neue">Garuda Muay Thaï</p>
          </transition>
          <transition name="div-slide">
            <div v-if="isVisible" class="w-2/3 h-2 bg-red-600"></div>
          </transition>
        </div>
        <div class="h-10"></div>
        <div v-if="!isMobile" class="justify-end">
          <transition name="slide">
            <div v-if="isVisible" class="flex w-full pt-20 pr-10 text-white font-bebas-neue items-end justify-end">
              <p class="text-3xl h-full leading-relaxed">Le </p>
              <p class="text-6xl mx-4">Lundi</p>
              <p class="text-3xl h-full leading-relaxed"> et </p>
              <p class="text-6xl mx-4">Jeudi</p>
              <p class="text-3xl h-full leading-relaxed"> à </p>
              <p class="text-6xl ml-4">19h30</p>
            </div>
          </transition>
          <transition name="div-slide">
            <div v-if="isVisible" class="w-1/4 h-2 bg-red-600 float-right mr-10"></div>
          </transition>
          <transition name="slide">
            <div v-if="isVisible" class="flex justify-end pt-20 pr-10 text-white font-bebas-neue items-end w-full justify-end">
              <p class="text-3xl h-full leading-relaxed">4 Rue Massenet</p>
              <p class="text-6xl ml-4">Lille</p>
            </div>
          </transition>
          <transition name="div-slide">
            <div v-if="isVisible" class="w-1/4 h-2 bg-red-600 float-right mr-10"></div>
          </transition>
        </div>
      </div>
      <button
        @click="arrowScroll"
        class="cursor-pointer z-50 absolute bottom-7 md:bottom-20 left-1/2 transform -translate-x-1/2 bg-red-600 rounded-full p-3 focus:outline-none shadow-[0_20px_100px_rgba(225,_38,_38,_100)] transition-transform duration-300 overflow-hidden"
        :class="{ 'translate-y-0': !isArrowUp, 'translate-y-[-50%]': isArrowUp }"
        ref="arrowButton"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor" ref="arrowIcon">
          <path fill-rule="evenodd" d="M10 18a.75.75 0 01-.53-.22l-7-7a.75.75 0 111.06-1.06L10 15.94l6.47-6.47a.75.75 0 111.06 1.06l-7 7A.75.75 0 0110 18z" clip-rule="evenodd" />
        </svg>
      </button>
      <img v-if="isMobile" src="@/assets/logo.png" alt="Logo" class="flex sticky top-100 bottom-0" ref="logo" />
    </div>

    <div v-if="isMobile" class="relative bg-[#1a1a18] min-h-dvh md:flex p-5 h-dvh md:z-auto w-full justify-evenly max-h-dvh max-sm:items-center max-sm:flex-col">
      <transition name="slide">
        <div v-if="isVisible" class="flex flex-wrap w-full pt-5 text-white font-bebas-neue items-end whitespace-normal justify-end">
          <p class="text-2xl leading-relaxed w-min">Le </p>
          <p class="text-6xl mx-4 w-min">Lundi</p>
          <p class="text-2xl leading-relaxed w-min"> et </p>
          <p class="text-6xl mx-4 w-min">Jeudi</p>
          <p class="text-2xl leading-relaxed w-min"> à </p>
          <p class="text-6xl ml-4 w-min">19h30</p>
        </div>
      </transition>
      <transition name="div-slide">
        <div v-if="isVisible" class="w-1/4 h-2 bg-red-600 float-right mr-10"></div>
      </transition>
      <transition name="slide">
        <div v-if="isVisible" class="flex justify-end pt-5 text-white font-bebas-neue items-end w-full">
          <p class="text-3xl h-full leading-relaxed">4 Rue Massenet</p>
          <p class="text-6xl ml-4">Lille</p>
        </div>
      </transition>
      <transition name="div-slide">
        <div v-if="isVisible" class="w-1/4 h-2 bg-red-600 float-right mr-10"></div>
      </transition>
      <img src="@/assets/tiger2c.png" alt="Logo" class="" />
      <button
        @click="arrowScroll"
        class="cursor-pointer z-50 absolute bottom-7 md:bottom-20 left-1/2 transform -translate-x-1/2 bg-red-600 rounded-full p-3 focus:outline-none shadow-[0_20px_100px_rgba(225,_38,_38,_100)] transition-transform duration-300 overflow-hidden"
        :class="{ 'translate-y-0': !isArrowUp, 'translate-y-[-50%]': isArrowUp }"
        ref="arrowButton"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor" ref="arrowIcon">
          <path fill-rule="evenodd" d="M10 18a.75.75 0 01-.53-.22l-7-7a.75.75 0 111.06-1.06L10 15.94l6.47-6.47a.75.75 0 111.06 1.06l-7 7A.75.75 0 0110 18z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <Header :isLanding="true" />
    <div class="container max-w-screen-sm md:w-screen md:flex md:justify-center md:bg-[#f0f0f0] md:max-w-full">
      <div class="bg-[#f0f0f0] flex-col flex items-center">
        <div class="container p-[2rem] md:p-[4rem] pb-0 text-xl w-full">
          <div class="flex justify-center ">
            <div class="place-content-between">
              <div class="pb-16">
                <h1 class="text-3xl font-bold">Bienvenue au Garuda Muay Thaï à Lille</h1>
                <div class="w-1/4 h-1 bg-red-600 my-3 mr-10"></div>
                <p class="align-left">
                  Le Muay Thaï, c'est plus qu'un sport : c'est un mode de vie.<br />
                  Apprenez à vous défendre, améliorez votre endurance et dépassez vos limites dans un environnement stimulant et soutenant.<br />
                  Améliorez votre forme physique, gagnez en confiance et faites partie d'une communauté passionnée.<br />
                </p>
              </div>
              <div class="grid">
                <h1 class="justify-self-end text-2xl font-bold pt-8 text-right">Tous niveaux</h1>
                <div class="justify-self-end w-1/4 h-1 bg-red-600 my-3"></div>
                <p class="justify-self-end text-right">
                  Nos entrainements de Muay Thaï sont ouverts à tous niveaux de compétence.<br />
                  Débutants, vous apprendrez les bases dans un environnement de soutien.<br />
                  Expérimentés, améliorez vos compétences avec des sessions intensives.
                </p>
                <br />
              </div>
            </div>
            <img v-if="!isMobile" src="@/assets/tiger.png" alt="Logo" class="w-1/3" />
          </div>
          <div>
            <div class="flex justify-between md:justify-evenly pt-10 px-2">
              <button class="px-4 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
                <a href="#inscription" v-smooth-scroll>Inscription</a>
              </button>
              <button v-if="!isMobile" class="px-4 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
                <a href="#infos" v-smooth-scroll>Infos Utiles</a>
              </button>
              <button class="px-4 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
                <a href="/shop">Boutique</a>
              </button>
            </div>
            <div v-if="isMobile" class="mx-2">
              <button class="w-full mt-5 px-4 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
                <a href="#infos" v-smooth-scroll>Infos Utiles</a>
              </button>
            </div>
          </div>
          <br /><br />
        </div>
        <div class="p-[2rem] md:p-[4rem] text-xl w-full">
          <a id="inscription"></a>
          <div class="flex w-full justify-center pb-10">
            <div class="w-1/2 h-1 bg-red-600 my-3 flex px-100 justify-self-center"></div>
          </div>
          <div class="pt-10 md:flex justify-around">
            <div class="w-full md:w-2/3">
              <h1 class="text-2xl font-bold mr-10">Essai gratuit</h1>
              <div class="w-1/4 h-1 bg-red-600 my-3 mr-10"></div>
              <p class="w-full md:w-4/5 text-left">
                Venez tester l'expérience gratuitement et voir ce que ce sport et notre club ont à vous offrir.<br />
                Vous n'avez besoin que de vêtements de sport et d'une bouteille d'eau.<br />
                Nous nous occupons du reste.
              </p>
            </div>
            <div class="w-full md:w-1/3 pt-9 text-right md:text-left md:pt-0">
              <h1 class="text-2xl font-bold">Frais d'Inscription</h1>
              <div class="w-1/3 h-1 bg-red-600 my-3 md:mr-10 max-md:float-right"></div>
              <p class="w-full text-right mt-7 md:mt-0 md:w-4/5 md:text-left pl-10">Adultes : 150€<br />Mineurs : 100€<br />Etudiants : 140€<br /> [Prix a ajuster]</p>
            </div>
          </div>
          <div class="pt-14 w-full">
            <p class="text-justify md:text-left">
              Pour vous inscrire, vous devez signer le réglement intérieur du centre social et culturel Roger Salengro lorsque vous visitez le club pour la première fois.<br />
              Un certificat médical est également requis pour les nouveaux membres. [COMPLETER INSTRUCTIONS ICI]<br />
            </p>
          </div>
        </div>
        <div class="container p-[2rem] md:p-[4rem] text-xl w-full">
          <div class="flex justify-between md:justify-evenly pt-10 px-2">
            <button class="px-1 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
              <a href="#" v-smooth-scroll>Formulaire d'inscription</a>
            </button>
            <button v-if="!isMobile" class="px-1 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
              <a href="#" v-smooth-scroll>Télécharger le réglement intérieur</a>
            </button>
            <button class="px-1 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
              <a href="#">Payer sa licence</a>
            </button>
          </div>
          <div v-if="isMobile" class="flex justify-center pt-5">
            <button class="mx-2 w-full px-1 py-2 border border-[#0D0D0D] rounded-lg shadow-md text-black hover:bg-red-600 hover:text-white md:px-5">
              <a href="#" v-smooth-scroll>Télécharger le réglement intérieur</a>
            </button>
          </div>
        </div>
        <a id="infos"></a>
        <br /><br /><br /><br />
        <div class="px-[2rem] md:px-[4rem] text-xl w-full">
          <div class="flex w-full justify-center pb-8">
            <div class="w-1/2 h-1 bg-red-600 my-3 flex px-100 justify-self-center"></div>
          </div>
          <div class="md:flex justify-around">
            <div class="w-full md:w-2/3">
              <div class="flex justify-around">
                <div class="w-full md:w-1/2">
                  <h1 class="text-2xl md:text-3xl font-bold">Horraires</h1>
                  <div class="w-1/4 h-1 bg-red-600 my-3 mr-10"></div>
                  <p class="w-4/5 text-left pl-10">
                    Lundi : 19h30 - 21h30<br />Jeudi : 19h30 - 21h30<br />
                  </p>
                </div>
                <div v-if="!isMobile" class="w-1/2">
                  <h1 class="text-3xl font-bold pb-10">Frais d'Inscription</h1>
                  <p class="w-4/5 text-left pl-10">Adultes : 150€<br />Mineurs : 100€<br />Etudiants : 140€<br /></p>
                </div>
              </div>
              <div class="md:flex justify-around pt-16">
                <div class="w-full md:text-left text-right">
                  <h1 class="text-3xl font-bold">Nous contacter</h1>
                  <div class="w-1/3 h-1 bg-red-600 my-3 md:mr-10 max-md:float-right"></div>
                  <p class="md:w-4/5 md:text-left pl-10 pb-3 md:flex pt-7 ">
                    Whatsapp:
                    <a href="https://wa.me/+33679394956"><p class="underline pl-3 text-blue-500">06 79 39 49 56</p></a><br />
                  </p>
                  <p class="md:w-4/5 md:text-left pl-10 pb-3 md:flex">
                    Messenger:
                    <a href="https://m.me/100063701644217"><p class="underline pl-3 text-blue-500">Nous contacter</p></a><br />
                  </p>
                  <p class="md:w-4/5 md:text-left pl-10 md:flex">
                    Email:
                    <a href="mailto:contact@garudamuayThaï.com"><p class="underline pl-3 text-blue-500">contact@garudamayThaï.com</p></a><br />
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3">
              <h1 class="text-3xl font-bold">Localisation</h1>
              <div class="w-1/4 h-1 bg-red-600 my-3 mr-10"></div>
              <p class="w-full text-left pl-10 pb-10 md:pb-0">Centre Socio-Culturel Roger Salengro<br />4 rue Massenet, Lille fives 59000</p>
              <iframe
                class="w-full pb-5"
                width="400"
                height="400"
                style="border: 0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBZKoG8gtAGCjOjjM5KBs75P8lwPt3qGNc&q=Garuda+Muay+Thaï+Lille"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
var lastpos = 0;
export default {
  name: 'LandingPage',
  data() {
    return {
      isLanding: true,
      isVisible: false,
      isArrowUp: false
    };
  },
  beforeMount() {
    document.title = 'Garuda Muay Thaï';
    document.body.style.backgroundColor = '#1a1a18';

    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    document.title = 'Garuda Muay Thaï';
    document.body.style.backgroundColor = '#1a1a18';

    setTimeout(() => {
      this.isVisible = true;
      this.animateArrow();
    }, 100);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    arrowScroll() {
      window.scrollTo({
        top: this.isMobile && window.scrollY > 500 ? window.innerHeight * 2 : window.innerHeight,
        behavior: 'smooth'
      });
      this.disableScroll();
    },
    handleScroll() {
      if (document.getElementById('mobileNav'))
        console.log(document.getElementById('mobileNav').getBoundingClientRect())
      if (window.scrollY <= 100 || (this.isMobile && window.scrollY <= 1000)) {
        if (lastpos < window.scrollY) {
          this.arrowScroll();
        }
      }
      lastpos = window.scrollY;
    },
    disableScroll() {
      console.log('Disabling scroll');
      document.body.style.overflow = 'hidden'
      window.removeEventListener('scroll', this.handleScroll);
      setTimeout(() => {
        document.body.style.overflow = 'auto'
        window.addEventListener('scroll', this.handleScroll);
      }, 1000);
    },
    animateArrow() {
      setInterval(() => {
        this.isArrowUp = true;
        setTimeout(() => {
          this.isArrowUp = false;
        }, 250);
      }, 5000); // Repeat every 5 seconds
    },
    toggleArrow() {
      this.isArrowUp = !this.isArrowUp;
    }
  }
};
</script>

<style>
.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}

@keyframes slideFromRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}

.slide-enter-active {
  animation: slideFromRight 0.80s ease forwards;
}
.div-slide-enter-active {
  animation: slideFromRight 0.50s ease forwards; /* Custom duration for div */
}

.arrow-transition-enter-active, .arrow-transition-leave-active {
  transition: transform 0.5s ease;
}
.arrow-transition-enter, .arrow-transition-leave-to {
  transform: translateY(-50%);
}
</style>
