<template>
    <footer class="bg-gray-800 text-gray-300 py-4 text-center">
        <div class="container mx-auto">
            <div class="flex">
                <div class="w-1/2">
                    <ul class="inline-block text-left">
                        <li><a href="#">Le club</a></li>
                        <li><a href="#">Inscription</a></li>
                        <li><a href="#">Horraires</a></li>
                        <li><a href="#">Boutique</a></li>
                    </ul>
                </div>
                <div class="w-1/2 ">
                    <ul class="inline-block text-left">
                        <li><a href="#">Ligue Française de Muay Thaï</a></li>
                        <li><a href="#">Ministère des Sports</a></li>
                        <Divider />
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">Politique de confidentialité</a></li>
                        <!-- Add more links as needed -->
                    </ul>
                </div>
            </div>
            <Divider />
            <p class="text-sm">&copy; 2024 Garuda Muay Thaï</p>
            <p class="text-sm mt-2">Made by <a href="https://github.com/ClemenceVan" class="text-gray-300 hover:text-gray-100">github/ClemeVan</a></p>
            <Divider />
        </div>
    </footer>
    </template>
    
    <script>
    import Divider from 'primevue/divider';
    export default {
        components: {
            Divider,
        }
    };
    </script>
    
    <style scoped>
    /* Your component-specific styles go here */
    </style>
    