<script setup lang="ts">

import UnitsList from "@/Components/MyApp/SideBar/UnitsList.vue";
import {ref, watch, computed, defineEmits} from "vue";
import {Unit} from "@/Components/MyApp/types/Unit";
import {Exercise} from "@/Components/MyApp/types/Exercise";

const props = defineProps<{units:Unit[],exercises:Exercise[], practiced:number[] }>();



const isOpen = ref(true);
//Variable para controlar el tiempo de renderizado
//Evito el efecto de que se vea el título antes de que se despliege el menú izquierdo
const showContent = ref(true);



//Un objeto de arrays con los ejercicios de cada tema agrupados
const groupedExercises = computed(() => {
    const groups = {};
    for (const ex of props.exercises ?? []) {
        if (!groups[ex.unit_id]) groups[ex.unit_id] = [];
        groups[ex.unit_id].push(ex);
    }
    return groups;
});

//Recojo el evento que está propagando UnitList de UnitItem que genera ExerciseItem y lo porpago a Slidebar
const emit = defineEmits(['statement']);

const onStatement = (exercise)=>emit("statement", exercise);


// console.log("En SidebarExercides");
// console.log("Ejerciciso por tema");
// console.log (groupedExercises.value);


const toggle_open = () => {
    isOpen.value = !isOpen.value;
};

watch (isOpen, (open)=>{
    if (open)
        setTimeout(()=>(showContent.value=true),250)
    else
        showContent.value=false
});


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
        <div v-if="showContent" class="mt-4">
            <h2 class="text-2xl font-bold mb-3 text-gray-800">📘 Listado de prácticas</h2>
            <UnitsList :practiced="practiced" :groupsExercises="groupedExercises" :units="units" @statement="onStatement"/>
        </div>

    </aside>

</template>

<style scoped>

</style>
