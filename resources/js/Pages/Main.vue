<script setup>
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";
import HeaderTitle from "@/Pages/Layouts/HeaderTitle.vue";
import StatementExercise from "@/Components/MyApp/StatementExercise.vue";
import ExecutionExercise from "@/Components/MyApp/ExecutionExercise.vue";
import ModalLogin from "@/Components/MyApp/ModalLogin.vue";
import { ref, defineEmits } from "vue";

const props = defineProps({ units: Array, exercises: Array });

const units = ref(props.units);
const exercises = ref(props.exercises);

const show_login = ref(false);
const open_login = () => (show_login.value = true);
const close_login = () => (show_login.value = false);

//Para ejecutar al recibir el evento de mostrar un enunciado
//Creamos la variable reactiva que va a recibir el valor de ejercicio propagado por eventos desde ExerciseItem
const selectedExercise = ref(null);

const showStatement = (exercise)=>{
    selectedExercise.value = exercise

    console.log("En main.vue");
    console.log("Viendo el valor recibido y propagado por eventos desde ExerciseItem");
    console.log("Selected exercise:", exercise);


};

console.log("Main.vue")
console.log("valor de exercise para statement")
console.log(selectedExercise);

//Recibo el evento de Sidebar que viene propagado de UnitsList=>UnitItem generado por exerciseItem


</script>

<template>
    <div
        v-cloak
        class="flex flex-col min-h-screen bg-gray-100"
    >
        <!-- ✅ Header fixed on top -->
        <HeaderTitle title="Listado de Ejercicios de PHP" @open-login="open_login" />

        <!-- ✅ Main content fills available space -->
        <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <SidebarExercises
                :units="units"
                :exercises="exercises"
                class=" border-r border-gray-200 overflow-y-auto"
                @statement="showStatement"
            />

            <!-- Main content -->
            <!-- Zona derecha -->
            <main class="flex flex-col flex-1 p-4 space-y-4">
                <!-- Enunciado -->
                <section class="bg-blue-200 p-6 rounded shadow">
                    <StatementExercise  :exercise="selectedExercise"/>
                </section>

                <!-- Ejecución -->
                <section class="bg-green-200 flex-1 p-6 rounded shadow">
                    <h2 class="text-xl font-bold text-center mb-2">Ejecución</h2>
                    <ExecutionExercise :exercise="selectedExercise" />

                </section>
            </main>
        </div>

        <!-- ✅ Footer stays at bottom -->
        <footer class="bg-yellow-600 text-white text-center p-4">
            Desarrollo de Aplicaciones Web en Entorno Servidor · Profesor Manuel Romero
        </footer>

        <!-- Modal -->
        <ModalLogin  :show_login="show_login" @close="close_login" />
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>
