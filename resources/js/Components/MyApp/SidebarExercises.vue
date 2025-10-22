<script setup>

import UnitsList from "@/Components/MyApp/UnitsList.vue";
import {ref} from "vue";

const props = defineProps({
    units: Object,
    exercises: Object,
});

const units = ref(props.units);

const exercises = ref(props.exercises);

const isOpen = ref(false);

const toggle_open = () => {
    isOpen.value = !isOpen.value;
};






</script>

<template>
    <aside
        class="bg-gray-200 transition-all duration-300 flex flex-col"
        :class="isOpen ? 'w-84 p-4' : 'w-6 p-1'"
    >
        <!-- Botón pegado al borde derecho -->
        <div class="flex justify-end">
            <img
                :src="isOpen ? '/images/icons/menu-desplegable-open.png' : '/images/icons/menu-desplegable-close.png'"
                @click="toggle_open"
                width="24"
                class="bg-white border shadow rounded text-xs px-1 "
            />
        </div>

        <!-- Contenido del menú, solo visible si isOpen -->
        <div v-show="isOpen" class="mt-4">
            <UnitsList :exercises="exercises" :units="units" />
        </div>
    </aside>

</template>

<style scoped>

</style>
