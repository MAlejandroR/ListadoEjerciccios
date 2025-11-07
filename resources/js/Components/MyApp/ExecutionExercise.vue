<script setup>
import {computed, watch} from "vue";

const props = defineProps({
    exercise: {
        type: Object,
        required: true,
    },
});

// Construimos la URL de forma reactiva
const iframeSrc = computed(() => {
    if (!props.exercise) return null;
    const index_name = props.exercise.index_name ??"";
    const folder_name_unit= props.exercise.unit?.folder_name ??"";
    const folder_name_exercise = props.exercise?.folder_name ??"";
    return `/exercises/${folder_name_unit}/${folder_name_exercise}/${index_name}`;
});


watch  (
    () => iframeSrc.value,
        (NewValue) => {
            alert (`Valor de iframe ${NewValue}`)
            console.log("En ExecutionExercise");
            console.log("A canbiado un valor");
            console.log(`Nueva url ${NewValue}`);
            console.log(props.exercise)
        },
        {immediate: true}
);



</script>

<template>
    <div>
        <iframe
            v-if="iframeSrc"
            :src="iframeSrc"
            width="100%"
            height="400"
            class="rounded border shadow"
        ></iframe>

        <div v-else class="text-gray-600 italic p-4">
            No hay datos de ejercicio para mostrar.
        </div>
    </div>
</template>

<style scoped>
iframe {
    transition: opacity 0.3s ease-in-out;
}
</style>
