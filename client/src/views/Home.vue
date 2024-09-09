<template>
  <div id="app" class="bg-gray-100 min-h-screen flex flex-col">
    <Header />

    <!-- Main Content -->
    <div class="container mx-auto py-8 flex">
      <!-- Facebook timeline -->
      <div v-if="!isMobile" class="py-4 pr-7 w-1/3 overflow-hidden">
        <div class="fb-page" data-href="https://www.facebook.com/profile.php?id=100063701644217" data-tabs="timeline" data-width="400" data-height="5000" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
          <blockquote cite="https://www.facebook.com/profile.php?id=100063701644217" class="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/profile.php?id=100063701644217">Garuda Muay Thaï 59</a>
          </blockquote>
        </div>
      </div>
      <!-- End Facebook timeline -->

      <!-- Messages -->
      <div class="py-4 w-full md:w-2/3 px-4 md:px-0">
        <div v-for="(article, index) in articles" :key="index">
          <Post :title="article.title" :content="article.content" :imageSrc="article.image" />
          <Divider class="py-14" />
        </div>
      </div>
      <!-- End Messages -->
    </div>

    <Footer />
  </div>
</template>

<script>
import Divider from 'primevue/divider';
import Post from '../components/Post.vue';
import axios from 'axios'; // Ensure axios is imported

export default {
  components: {
    Post,
    Divider,
  },
  data() {
    return {
      articles: [], // Reactive property to store articles
    };
  },
  mounted() {
    this.isMobile = window.innerWidth < 768;
    // Load Facebook SDK
    let fbScript = document.createElement('script');
    fbScript.setAttribute('src', 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v20.0');
    fbScript.setAttribute('nonce', 'GB8hPj90');
    document.head.appendChild(fbScript);

    // Fake articles
    this.articles = [
        {
            "id": "kcRbWvuznpIYMMAgjzxlq",
            "title": "Reprise des cours le 10 septembre !",
            "content": "La saison 2024-2025 reprend le 10 septembre !<br/><br/>Les cours de boxe thaïlandaise sont ouverts à tous, débutants comme confirmés.<br/><br/>N'hésitez pas à venir essayer un cours gratuitement pour découvrir notre club et notre ambiance!<br/> Rendez-vous au 4 Rue Massenet à Lille.",
            "image": ""
        },
        {
            "id": "aUvfDc1PczFMnaq7sGG6f",
            "title": "Nouveau site Garuda Muay Thaï !",
            "content": "Bienvenue sur le nouveau site de Garuda Muay Thaï !<br/><br/>Vous y trouverez toutes les informations nécessaires pour vous inscrire et pratiquer la boxe thaïlandaise dans notre club.<br/><br/>N'hésitez pas à nous contacter pour plus d'informations.",
            "image": ""
        }
    ]
    // articles.forEach((item, index) => {
    //   // const imageUrl = URL.createObjectURL(response.data);
    //   this.articles[index].image = imageUrl; // Update image property
    //   this.$forceUpdate(); // Force re-render to ensure Vue notices the change
    // });

    // // Fetch articles
    // axios.get(this.$hostname + '/articles')
    //   .then((response) => {
    //     this.articles = response.data.data;
    //     this.articles.forEach((item, index) => {
    //       axios.get(this.$hostname + '/article/image/' + item.id, { responseType: 'blob' })
    //         .then((response) => {
    //           const imageUrl = URL.createObjectURL(response.data);
    //           this.articles[index].image = imageUrl; // Update image property
    //           this.$forceUpdate(); // Force re-render to ensure Vue notices the change
    //         })
    //         .catch((error) => {
    //           console.error('Error fetching image:', error);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching articles:', error);
    //   });
  },
};
</script>

<style>
/* Your component styles go here */
</style>
