<script setup>

import {ref, defineProps, defineEmits, computed, watch} from "vue";
import ExerciseItem from "@/Components/MyApp/ExerciseItem.vue";
import {library} from '@fortawesome/fontawesome-svg-core'
import {router, usePage} from "@inertiajs/vue3";

const props = defineProps({unit: Object, exercises: Array})


const page = usePage();
const is_admin = computed(()=> page.props.auth.user?.is_admin===true);
const admin_unit=(id)=>{
    router.visit(`admin/units/${id}/edit`)
};

const admin_exercise=(id)=>{
    router.visit(`/admin/exercises/${id}/edit`);
}








const isOpen = ref(false);
const toggle = () => {
    isOpen.value = !isOpen.value;
}

//Recojo el evento generado por ExercisesItem y lo propago
const emit = defineEmits(['statement']);
const onStatement = (exercise)=>emit('statement', exercise);

console.log("En UnitItem");
console.log(`Ejercicios: ${props.exercises}`);
watch(
    isOpen,
        (newValue)=>{
        console.log(`Is open chang to value ${newValue}`)
        });




</script>

<template>
    <div class="space-y-4">
        <div
            class="bg-white shadow-sm rounded-2xl p-4 border border-gray-100
        transition-transform transition-shadow duration-200 ease-out
        hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-200 cursor-pointer "
        >
            <h2 class="text-xm font-semibold text-gray-800 flex items-center gap-2 pb-2 mb-3 border-b border-gray-200">
                <i class="fa-solid fa-layer-group text-blue-600"></i>
                {{ unit.title }}
                <i :class="[
                                'ml-auto flex items-center justify-center w-6 h-6 rounded-full' +
                                 ' text-gray-600 bg-gray-100 hover:bg-gray-200 ' +
                                  'cursor-pointer transition-all duration-200 shadow-sm',
                                isOpen ? 'fa-solid fa-sort-up py-2 translate-y-[2px]'
                                          : 'fa-solid fa-sort-down -translate-y-[2px]'
                    ]"
                   @click="toggle"
                ></i>
                <i
                    v-if="is_admin"
                    @click.stop="admin_unit(unit.id)"
                    class="fa-solid fa-user-tie text-blue-600 hover:text-blue-800 cursor-pointer"
                    title="Editar en panel de administración"
                ></i>
            </h2>
             <ol v-if="isOpen" class="list-decimal list-inside text-gray-700 space-y-1">
                <li
                    v-for="exercise in exercises"
                    :key="exercise.id"
                    class="px-3 py-2 rounded-md bg-gray-50 shadow-sm
           hover:bg-gray-100 hover:shadow-md
           transition-all duration-200 inline-flex w-full">
                    {{console.log(exercise.list_title)}}
                    <ExerciseItem :exercise="exercise" @statement="onStatement"/>


                </li>
            </ol>

        </div>
    </div>


</template>

<style scoped>

</style>
