<template>
    <div class="flex items-center space-x-4 pr-4 z-60">
      <button @click="FacebookProfile" class="text-white py-3 px-3 rounded-lg hover:text-[#1877F2]">
        <i class="fab fa-facebook fa-lg"></i> <!-- Facebook icon -->
      </button>
      <button @click="WhatsappProfile" class="text-white py-3 px-3 rounded-lg hover:text-[#25D366]">
        <i class="fab fa-whatsapp fa-lg"></i> <!-- Whats app icon -->
      </button>
      <button @click="MessengerProfile" class="text-white py-3 px-3 rounded-lg hover:text-[#168AFF]">
        <i class="fab fa-facebook-messenger fa-lg"></i> <!-- Messenger icon -->
      </button>
      <button @click="GmailProfile" class="text-white py-3 px-3 rounded-lg hover:text-red-400">
        <i class="fas fa-envelope fa-lg"></i> <!-- Google Mail icon -->
      </button>
    </div>
  </template>
  
  <script>
  // Import Font Awesome CSS
  import '@fortawesome/fontawesome-free/css/all.css';
  
  export default {
    methods: {
      FacebookProfile() {
        window.open('https://www.facebook.com/profile.php?id=100063701644217', '_blank');
      },
      MessengerProfile() {
        window.open('https://m.me/100063701644217', '_blank');
      },
      WhatsappProfile() {
        window.open('https://wa.me/+33679394956', '_blank');
      },
      GmailProfile() {
        // Add your logic to redirect to Gmail profile
        console.log('mailto:contact@garudamuayThaï.com');
      },
      // Add more methods for other social media platforms if needed
    }
  };
  </script>
  