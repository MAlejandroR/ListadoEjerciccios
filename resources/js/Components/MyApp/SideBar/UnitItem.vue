<script setup>

import {ref, defineProps, defineEmits, computed, watch} from "vue";
import ExerciseItem from "@/Components/MyApp/SideBar/ExerciseItem.vue";
import {library} from '@fortawesome/fontawesome-svg-core'
import {router, usePage} from "@inertiajs/vue3";

const props = defineProps({unit: Object, exercises: Array, practiced:Array})


const page = usePage();
const role = computed (()=>page.props.auth.role);

const admin_unit=(id)=>{
    router.visit(`admin/units/${id}/edit`)
};

const admin_exercise=(id)=>{
    router.visit(`/admin/exercises/${id}/edit`);
}








const isOpen = ref(false);


//This sectio it is to management to shepherd and controle extenal to open and colose list of exercises
const open  = ()=>{
    console.log ("En UnitItem en Open");
    isOpen.value = true;
}
const close  = ()=>{
    isOpen.value = false;
}
//Para poder hacer cambiar el valor de isOpen desde fuera de este componente
defineExpose({
    open,
    close
})
const toggle = () => {
    isOpen.value = !isOpen.value;
}

//Recojo el evento generado por ExercisesItem y lo propago
const emit = defineEmits(['statement']);
const onStatement = (exercise)=>emit('statement', exercise);
//
// console.log("En UnitItem");
// console.log(`Ejercicios: ${props.exercises}`);
watch(
    isOpen,
        (newValue)=>{
        console.log(`Is open chang to value ${newValue}`)
        });




</script>

<template>
    <div class="space-y-1" :id="`unit-${unit.id}`">
        <div
            class="bg-white shadow-sm rounded-xl p-1.5 border border-gray-100
               transition-transform transition-shadow duration-150 ease-out
               hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 cursor-pointer"
        >
            <h2 class="text-sm font-semibold text-gray-800 flex items-center gap-2 pb-1 mb-1">
                <i class="fa-solid fa-layer-group text-blue-600"></i>
                {{ unit.title }}
                <i
                    v-if="role=='admin'"
                    @click.stop="admin_unit(unit.id)"
                    class="fa-solid fa-user-tie text-blue-600 hover:text-blue-800 cursor-pointer"
                    title="Editar unidad"
                ></i>
                <i :class="[
                'ml-auto flex items-center justify-center w-5 h-5 rounded-full text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-200 shadow-sm',
                isOpen ? 'fa-solid fa-sort-up py-[2px]' : 'fa-solid fa-sort-down -translate-y-[1px]'
            ]"
                   @click="toggle"
                ></i>


            </h2>

            <ol
                v-if="isOpen"
                class="list-decimal list-inside text-gray-700 space-y-0.5"
            >
                <li
                    v-for="exercise in exercises"
                    :key="exercise.id"
                    class="px-2 py-1 rounded-md bg-gray-50 shadow-sm
                       hover:bg-gray-100 hover:shadow-md transition-all duration-150 inline-flex w-full"
                >
                    {{ console.log(`unit id = ${unit.id}`) }}
                    <ExerciseItem
                        :practiced="practiced"
                        :exercise="exercise"
                        @statement="onStatement"
                    />
                </li>
            </ol>
        </div>
    </div>
</template>

<style scoped>

</style>
