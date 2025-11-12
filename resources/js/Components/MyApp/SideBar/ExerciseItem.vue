<script setup lang="ts">
import {ref, defineProps, computed} from "vue";
import {router, usePage} from "@inertiajs/vue3";


//Para ver si soy o no admin
const page = usePage();
const role = computed (()=>page.props.auth.role);

const admin_exercise=(id)=>{
    router.visit(`/admin/exercises/${id}/edit`);
}




const props = defineProps({exercise:Object, isOpen:Boolean, practiced:Array})

const isPracticed = computed(() =>
    props.practiced?.includes(props.exercise.id)
);

const togglePracticed = (event: Event) => {
    console.log ("Cambiando valor en servidor");
    const target = event.target as HTMLInputElement;
    router.post(
        route("exercises.practice", props.exercise.id),
        { practiced: target.checked },
        { preserveScroll: true, preserveState: true }
    );
};

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
        class="block italic text-sm text-gray-700 px-3 py-2 rounded-lg
           bg-gray-50 shadow-sm hover:shadow-md hover:bg-gray-100
           transition-all duration-200"
        @click="sendStatement"
    >
        <input
            v-if="role === 'student'"
            type="checkbox"
            :checked="isPracticed"
            class="checkbox checkbox-secondary scale-75"
            @click.stop
            @change="togglePracticed"
        />

        {{ exercise.exercise_title }}
        <i
            v-if="role==='admin'"
            @click.stop="admin_exercise(exercise.id)"
            class="fa-solid fa-user-tie text-blue-600 hover:text-blue-800 cursor-pointer"
            title="Editar en panel de administración"
        ></i>


    </div>
<!--            <span class="italic text-sm text-gray-500">{{exercise.exercise_title}}</span>-->
</template>

<style scoped>

</style>
