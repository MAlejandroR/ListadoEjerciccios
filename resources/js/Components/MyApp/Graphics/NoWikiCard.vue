<script setup lang="ts">

import {computed} from "vue";
import type {WikiAvailable} from "@/Components/MyApp/types/WikiAvailable";



const props = withDefaults(defineProps<{ mode: WikiAvailable }>(),{
    mode:"no-selection",
});


const title = computed(()=>{
    return (props.mode =="no-wiki")?
        "Enunicado no disponible":
        "No has seleccionad ningún ejercicio"
});

const content = computed(() => {
    switch (props.mode) {
        case "no-wiki":
            return {
                title: "Enunciado no disponible",
                message:
                    "Este ejercicio aún no tiene una página wiki ni descripción asociada.",
                icon: "fa-regular fa-file-lines",
                color: "text-indigo-500",
            };
        case "wiki-error":
            return {
                title: "Página no disponible",
                message:
                    "La wiki de este ejercicio no se ha podido cargar (error 404 o temporalmente inaccesible).",
                icon: "fa-solid fa-triangle-exclamation",
                color: "text-red-500",
            };
        default:
            return {
                title: "Ningún ejercicio seleccionado",
                message: "Selecciona un ejercicio de la lista lateral para ver su enunciado.",
                icon: "fa-solid fa-book-open",
                color: "text-blue-500",
            };
    }
});</script>

<template>
    <div
        class="flex flex-col items-center justify-center text-center gap-3 p-10 rounded-2xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-slate-100 shadow-inner transition hover:shadow-md"
    >
        <i :class="[content.icon, 'text-5xl', 'drop-shadow', content.color]"></i>
        <h2 class="text-xl font-semibold text-gray-700 mt-2">{{ content.title }}</h2>
        <p class="text-gray-500 text-sm max-w-md">{{ content.message }}</p>
        <div
            class="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-4"
        ></div>
        <p class="text-xs text-gray-400 italic">
            💡 Consejo: revisa los ejercicios marcados como <strong>🟢 prácticos</strong>.
        </p>
    </div>
</template>
<style scoped>
/* Small fade-in animation for elegance */
div {
    animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
