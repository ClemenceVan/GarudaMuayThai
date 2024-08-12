<template>
    <div class="md:w-[20rem] m-10 text-center cursor-pointer rounded-lg hover:shadow-lg transition-all duration-10 ease-in-out transform hover:-translate-y-1">
        <h2 class="text-2xl font-bold pb-2">{{ title }}</h2>
        <div class="mx-5 w-1/4 h-1 bg-red-600 my-2 mr-10" ></div>
        <div class="mx-5 h-3/4 pb-5 flex">
            <img :src="imageSrc" alt="Item Image" class="mx-auto max-w-full m-auto">
        </div>
        <p class="text-xl text-gray-600 text-red-700 font-bold">{{ description }}</p>
        <p class="text-xl text-gray-600">{{ price }}€</p>
    </div>
</template>

<script>
export default {
    name: 'ItemComponent',
    props: {
        title: {
            type: String,
            required: true
        },
        imageSrc: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
