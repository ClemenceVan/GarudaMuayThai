<template>
    <h2 class="text-2xl font-bold text-center pb-5">{{ title }}</h2>
    <p class="text-xl text-gray-600" v-html="sanitizedContent"></p>
    <div v-if="imageSrc" class="w-full p-20">
        <img :src="imageSrc" alt="Post Image" class="mx-auto pb-5 max-w-full">
    </div>
</template>

<script>
import DOMPurify from 'dompurify';

export default {
    name: 'ContentComponent',
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        imageSrc: {
            type: String,
            required: true
        }
    },
    computed: {
        sanitizedContent() {
            return DOMPurify.sanitize(this.content);
        }
    }
}
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>
