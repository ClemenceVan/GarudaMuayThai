<template>
    <div id="app" class="bg-gray-100 min-h-screen flex flex-col">
      <body>
      <Header />
      <div class="mx-auto py-8 justify-center py-32">
        <div class="text-left pl-5">
          <h2 class="text-4xl text-left">Page non trouvée</h2>
          <div class="w-1/4 h-1 bg-red-600 my-3 mr-10" ></div>
          <p class="text-2xl text-red-700 font-bold">La page que vous cherchez n'existe pas.</p>
          <p class="text-2xl font-bold">Veuillez vérifier l'URL ou revenir à la <a class="text-blue-600" href="/">page d'accueil</a>.</p>
          <p class="text-2xl pt-10">Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur du site:
            <button @click="WhatsappProfile" class="py-3 px-3 rounded-lg text-[#25D366]">
              <i class="fab fa-whatsapp fa-lg"></i> <!-- Whats app icon -->
            </button>
          </p>
        </div>
      </div>
      </body>
      <Footer />
    </div>
  </template>
  
  <script>
  // Import Font Awesome CSS
  import '@fortawesome/fontawesome-free/css/all.css';
  
  export default {
    methods: {
      WhatsappProfile() {
        window.open('https://wa.me/+33619373636', '_blank');
      },
    }
  };
  </script>