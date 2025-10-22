<script setup>
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";
import HeaderTitle from "@/Pages/Layouts/HeaderTitle.vue";
import StatementExercise from "@/Components/MyApp/StatementExercise.vue";
import ExecutionExercise from "@/Components/MyApp/ExecutionExercise.vue";

import ModalLogin from "@/Components/MyApp/ModalLogin.vue";
import {ref} from "vue";


const props = defineProps({units:Array, exercises:Array});

const units = ref(props.units)
const exercises = ref(props.exercises)


const show_login=ref(false);
const open_login = ()=>{show_login.value =true}
const close_login = ()=>{show_login.value =false}


</script>

<template>
    <div class="flex flex-col min-h-screen bg-gray-100">

        <!--TODO se puede parametrizar por admin para generalizar-->
        <HeaderTitle title="Listado de Ejercicios de PHP"/>
        <div class="flex flex-1">
            <SidebarExercises units="units" exercises="exercises"/>
        </div>
        <main class="flex flex-col flex-1 p-4 space-y-4">
            <StatementExercise/>
            <ExecutionExercise/>
        </main>
        <footer class="bg-yellow-600 text-white text-center p-4">
            Desarrollo de Aplicaciones Web en Entorno Servidor · Profesor Manuel Romero
        </footer>
        <!-- 🟢 Modal overlay for Login -->
        <ModalLogin :show="show_login" @close="close_login" />
    </div>


</template>

<style scoped>

</style>
