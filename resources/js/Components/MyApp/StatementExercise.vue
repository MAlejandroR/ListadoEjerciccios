<script setup>
import {computed, watch} from "vue";

const props = defineProps({
    exercise: {
        type: Object,
        default: null
    }
});

// 🧹 Limpiar URL por si viene con comillas o atributos extra
function cleanWikiUrl(raw) {
    if (!raw) return null;
    return raw
        .replace(/['"]/g, "")
        .replace(/\s+width=.*$/i, "")
        .replace(/\s+height=.*$/i, "")
        .trim();
}

// ✅ computed reactivo (devuelve *cadena o null*)
//MRMR TODO hay que revisar esto, me lo ha dado el chatgpt. En teoría la url está limpia en la bd

const wikiUrl = computed(() => {
    const url = props.exercise?.wiki_url;
    const cleaned = cleanWikiUrl(url);
    console.log("🧮 wikiUrl calculado:", cleaned ?? "Sin URL válida");
    return cleaned;
});

// 👀 watch: se ejecuta cada vez que cambia el ejercicio
watch(
    () => props.exercise,
    (newValue) => {
        console.log("🔁 props.exercise ha cambiado:");
        console.log(newValue ?? "Sin valor recibido");
    },
    { immediate: true }
);



// const wiki_url = props.exercise.wiki_url
console.log("En StatementExercise");
console.log("Recibiendo el ejercicio propagado desde ExerciseItem");
console.log(wikiUrl??"Sin valor wiki_url");

</script>

<template>
    <div class="text-center">
        <!-- ✅ Solo muestra el iframe si wikiUrl tiene texto -->
        <iframe
            v-if="wikiUrl && wikiUrl.length > 0"
            :src="wikiUrl"
            width="100%"
            height="400"
            class="rounded border shadow"
        ></iframe>

        <!-- ❌ Si no hay URL -->
        <div v-else class="italic text-gray-700 p-4">
            Aquí iría el enunciado.<br />
            No hay <code>wiki_url</code> disponible para este ejercicio.
        </div>

        <!-- 📜 Descripción opcional -->
        <p v-if="props.exercise?.description" class="mt-2 text-gray-600">
            {{ props.exercise.description }}
        </p>
    </div>
    <!--
    <h2 class="text-xl font-bold text-center text-navy-900">
        <iframe  v-if='wiki_url' :src='wiki_url'></iframe>
        <div v-else>
            Aquí iría el enunciado
            Necesito recibir el id del ejercicio para cargar un iframe con el wiki_url campo
            O bien la descripción si no hay wiki_url
        </div>
    </h2>
    <p class="mt-2">
        Texto o descripción de la práctica seleccionada...
    </p>
    -->
</template>

<style scoped>

</style>
