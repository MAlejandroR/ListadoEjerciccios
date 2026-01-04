<script setup lang="ts">
import {ref, defineProps, computed, inject, provide} from "vue";
import {router, usePage} from "@inertiajs/vue3";
import {Exercise} from "@/Components/MyApp/types/Exercise.js";


//Para ver si soy o no admin
const page = usePage();
const role = computed (()=>page.props.auth.role);



const admin_exercise=(id)=>{
    router.visit(`/admin/exercises/${id}/edit`);
}




const props = defineProps<{exercise:Exercise,  practiced:number[]}>()

const isPracticed = computed(() =>
    props.practiced?.includes(props.exercise.id)
);

const demoPracticed = ref<boolean>(false);
//Si algún componente externo ha modificado esta variable, tomo su valor (no su copia),
//Si no tomo false
/*
* 1. provide → “comparto algo” (Un componente padre)
  2. Inject → “uso eso que compartieron” (Un componente profundo)
* */
const isTourActive = inject("isTourActive", false);

const changeSelected=()=>{

}
const togglePracticed = (event: Event) => {
    console.log ("Cambiando valor en servidor");
    const target = event.target as HTMLInputElement;
    router.post(
        route("exercises.practice", props.exercise.id),
        { practiced: target.checked },
        { preserveScroll: true, preserveState: true }
    );
};

const onChange=(e)=> {
    if (isTourActive) {
        demoPracticed.value = e.target.checked
        return;
    }
    togglePracticed(e);
}



const exercise = props.exercise;

const emit = defineEmits(['statement']);

const sendStatement = ()=>{
    console.log("En ExerciseItem enviando evento")
    console.log(exercise)
    emit("statement", props.exercise);
};



</script>

<template>
    <div
        class="flex items-center gap-2 text-sm text-gray-700
           px-2 py-1 rounded-md bg-white border border-gray-200
           hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm
           transition-all duration-150 cursor-pointer"
        :id="`exercise-box-${exercise.id}`"
        @click="sendStatement"
    >
        <!-- Checkbox estudiante -->
        <input
            v-if="role === 'student'"
            type="checkbox"
            :id="`exercise-${exercise.id}`"
            :checked="isPracticed || demoChecked "
            class="checkbox checkbox-secondary scale-50"
            @click.stop
            @change="onChange"
        />

        <!-- Título -->
        <span class="leading-tight" >
        {{ exercise.exercise_title }}
    </span>

        <!-- Botón admin -->
        <i
            v-if="role==='admin'"
            @click.stop="admin_exercise(exercise.id)"
            class="fa-solid fa-user-tie text-blue-600 hover:text-blue-800 cursor-pointer ml-auto"
            title="Editar ejercicio"
        ></i>
    </div>
<!--            <span class="italic text-sm text-gray-500">{{exercise.exercise_title}}</span>-->
</template>

<style scoped>

</style>
