<template>
<div id="app" class="bg-gray-100 min-h-screen flex flex-col">
    <body>
    <Header />
    
    <!-- Main Content -->
    <div class="container mx-auto py-8 flex">
      <!-- Facebook timeline -->
        <div class="py-4 w-1/3 overflow-hidden">
          <div class="fb-page" data-href="https://www.facebook.com/profile.php?id=100063701644217" data-tabs="timeline" data-width="400" data-height="5000" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
            <blockquote cite="https://www.facebook.com/profile.php?id=100063701644217" class="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/profile.php?id=100063701644217">Garuda Muay Thaï 59</a>
            </blockquote>
          </div>
        </div>
      <!-- End Facebook timeline -->

      <!-- Messages -->
      <div class="py-4 w-2/3">
        <Post title="Nouveau site Garuda Muay Thaï !"
          content="Bienvenue sur le nouveau site de Garuda Muay Thaï !<br/><br/>
          Vous y trouverez toutes les informations nécessaires pour vous inscrire et pratiquer la boxe thaïlandaise dans notre club.<br/><br/>
          N'hésitez pas à nous contacter pour plus d'informations." />
        <Divider class="py-14" />
        <Post 
            title="My Title" 
            content="<strong>This is bold content.</strong> <em>This is italic content.</em>"
            imageSrc="https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/290596444_443536574446394_1991465983046796549_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PKyVcTH_wzAQ7kNvgGUo64H&_nc_ht=scontent-cph2-1.xx&oh=00_AYDlbfI-n0ZGcz8xcwbT_4s2j-0dJCM6XjdigyUeaZIK0g&oe=6671E023"
        />
        <Divider class="py-14" />
      </div>
      <!-- End Messages -->
    </div>
  </body>
    <Footer />
</div>
</template>

<script>
import Divider from 'primevue/divider';
import Post from '../components/Post.vue';

export default {
  components: {
    Post,
    Divider,
  },
  mounted() {
    let fbScrippt = document.createElement('script');
    fbScrippt.setAttribute('src', 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v20.0');
    fbScrippt.setAttribute('nonce', 'GB8hPj90');
    document.head.appendChild(fbScrippt);
  },
  data() {
    return {
      // Your data goes here
    };
  },
};
</script>

<style>
/* Your component styles go here */
</style>
