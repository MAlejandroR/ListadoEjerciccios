<script setup lang="ts">
import { computed, ref, watch, toRefs } from "vue";
import type { Exercise } from "@/Components/MyApp/types/Exercise";

const props = defineProps<{ exercise?: Exercise | null }>();
const { exercise } = toRefs(props);

const showSource = ref(false);
const sourceCode = ref<string | null>(null);
const loadingSource = ref(false);
const errorLoading = ref(false);
// 🧮 URL base (para iframe y para contenido.php)
const basePath = computed(() => {
    if (!exercise.value) return null;
    const folder_name_unit = exercise.value.unit?.folder_name ?? "";
    const folder_name_exercise = exercise.value.folder_name ?? "";
    return `/storage/exercises/${folder_name_unit}/${folder_name_exercise}`;
});

// 📄 Archivo ejecutable (index)
const iframeSrc = computed(() => {
    if (!exercise.value || !basePath.value) return null;
    const index_name = exercise.value.index_name ?? "index.php";
    return `${basePath.value}/${index_name}`;
});

// 💻 Archivo de código fuente (contenido.php)
const sourceUrl = computed(() => {
    if (!basePath.value) return null;
    return `${basePath.value}/contenido.php`;
});
const loadSource=()=>{
    if (!sourceUrl.value) return
        window.open(sourceUrl.value, "_blank");
}

// 🔘 Cargar el código fuente del servidor
// async function loadSource() {
//     if (!sourceUrl.value) return;
//     showSource.value = !showSource.value;
//
//     if (showSource.value) {
//         loadingSource.value = true;
//         errorLoading.value = false;
//         try {
//             const response = await fetch(sourceUrl.value);
//             if (!response.ok) throw new Error("Error HTTP");
//             const text = await response.text();
//             sourceCode.value = text;
//         } catch (err) {
//             errorLoading.value = true;
//             sourceCode.value = null;
//         } finally {
//             loadingSource.value = false;
//         }
//     }
// }
</script>

<template>
    <div>
        <!-- 🔘 Botón para mostrar el código -->
        <div v-if="exercise && exercise.show_source" class="p-2">
            <button
                class="btn btn-outline btn-primary btn-sm flex items-center gap-2"
                @click="loadSource"
            >
                <i class="fa-solid fa-code"></i>
                {{ showSource ? "Ocultar código fuente" : "Ver código fuente" }}
            </button>
        </div>
        <!-- 🧩 Iframe de ejecución -->
        <iframe
            v-if="iframeSrc"
            :src="iframeSrc"
            width="100%"
            height="400"
            class="rounded border shadow mt-3"
        ></iframe>
        <div v-else class="text-gray-600 italic p-4">
            No hay datos de ejercicio para mostrar.
        </div>
        <!-- 💻 Bloque de código -->
        <div
            v-if="showSource"
            class="bg-gray-100 border rounded p-4 mt-4 font-mono text-sm overflow-x-auto shadow-inner"
        >
            <div v-if="loadingSource" class="text-gray-500 italic">Cargando código...</div>
            <div v-else-if="errorLoading" class="text-red-600">Error al cargar el archivo.</div>
            <pre v-else><code>{{ sourceCode }}</code></pre>
        </div>
    </div>
</template>

<style scoped>
iframe {
    transition: opacity 0.3s ease-in-out;
}
pre {
    white-space: pre-wrap;
    word-break: break-word;
}
</style>
