<template>
    <footer class="bg-[#1a1a18] text-[#f0f0f0] py-4 text-center">
        <div class="container mx-auto h-full justify-center">
            <div class="flex h-2/3 py-2 md:py-8 md:w-2/3 mx-auto justify-between">
                <div class="">
                    <ul class="md:inline-block text-left px-5">
                        <li><a href="/home" class="hover:text-red-600 transition-colors">Le club</a></li>
                        <li><a href="/#inscription" class="hover:text-red-600 transition-colors">Inscription</a></li>
                    </ul>
                    <ul class="md:inline-block text-left px-5">
                        <li><a href="/#infos" class="hover:text-red-600 transition-colors">Horraires</a></li>
                        <li><a href="/shop" class="hover:text-red-600 transition-colors">Boutique</a></li>
                    </ul>
                </div>
                <div class="w-[0.5px] bg-[#f0f0f0]"></div>
                <div class="">
                    <ul class="md:inline-block text-left px-5">
                        <li><a href="https://www.ffkmda.com/" class="hover:text-red-600 transition-colors">Fédération de Muay Thai : FFKMDA</a></li>
                        <li><a href="https://www.sports.gouv.fr/" class="hover:text-red-600 transition-colors">Ministère des Sports</a></li>
                    </ul>
                    <ul class="md:inline-block text-left px-5">
                        <li><a href="/mentionslegales.pdf" download="mentionslegales.pdf" class="hover:text-red-600 transition-colors">Mentions légales</a></li>
                        <li><a href="#" class="hover:text-red-600 transition-colors">Politique de confidentialité (à faire)</a></li>
                    </ul>
                </div>
            </div>
            <Divider />
            <p class="text-sm">&copy; 2024 Garuda Muay Thaï</p>
            <p class="text-sm mt-2">Made by <a href="https://github.com/ClemenceVan" class="text-[#f0f0f0] hover:text-red-600 transition-colors">github/ClemeVan</a></p>
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
