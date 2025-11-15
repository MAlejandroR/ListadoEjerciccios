<script setup lang="ts">
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";
import HeaderTitle from "@/Pages/Layouts/HeaderTitle.vue";
import StatementExercise from "@/Components/MyApp/Main/StatementExercise.vue";
import ExecutionExercise from "@/Components/MyApp/Main/ExecutionExercise.vue";
import ModalLogin from "@/Components/MyApp/ModalLogin.vue";
import ModalRegister from "@/Components/MyApp/ModalRegister.vue";
import { ref, defineEmits } from "vue";
import type {Unit} from "@/Components/MyApp/types/Unit";
import type {Exercise} from "@/Components/MyApp/types/Exercise";
import type {Course} from "@/Components/MyApp/types/Course";





// const props = defineProps({ units: Array, exercises: Array });
const props=defineProps<{units:Unit[], exercises:Exercise[], courses:Course[], practiced:number[]}>()


//Gestión de los formularios emergentes para login y register
const show_login = ref(false);
const open_login = () => (show_login.
    value = true);
const close_login = () => (show_login.value = false);


const show_register = ref(false);
const open_register = () => (show_register.value = true);
const close_register = () => (show_register.value = false);

//Para ejecutar al recibir el evento de mostrar un enunciado
//Creamos la variable reactiva que va a recibir el valor de ejercicio propagado por eventos desde ExerciseItem
const selectedExercise = ref<Exercise|null>(null);

//Función que viene de un emit desde:
// ExerciseItem => UnitItem=>UnitList
const showStatement = (exercise)=>{
    selectedExercise.value = exercise
    //Seleccionar al campo folder_name de units where unit_id = exercise_units_id
    //Añadir ese valor a cada registro
    //  for ($exercise )

    //
    // console.log("En main.vue");
    // console.log("Viendo el valor recibido y propagado por eventos desde ExerciseItem");
    // console.log("Selected exercise:", exercise);

};

// console.log("Main.vue")
// console.log("valor de exercise para statement")
// console.log(selectedExercise);

//Recibo el evento de Sidebar que viene propagado de UnitsList=>UnitItem generado por exerciseItem


</script>
<template>

    <div class="flex flex-col min-h-screen bg-slate-50">

        <!-- Header (professional style) -->
        <HeaderTitle title="Listado de Ejercicios de PHP"
                     @open-register ="open_register" @open-login="open_login" />

        <div class="flex flex-1 overflow-hidden">

            <!-- Sidebar -->

            <SidebarExercises  class="bg-white border-r shadow-sm"
                :units="units"
                :exercises="exercises"
                :practiced="practiced"

                @statement="showStatement"
            />

            <!-- Main content -->
            <main class="flex flex-1 p-6 bg-slate-50 overflow-auto">

                <div class="max-w-5xl mx-auto w-full space-y-6">

                    <div class="bg-white rounded-xl shadow-sm border p-6">

                        <!-- Enunciado -->
                        <h2 class="text-lg font-semibold text-slate-800 mb-4">
                            Enunciado
                        </h2>

                        <div class="max-h-[400px] overflow-auto bg-slate-50 rounded p-4">
                            <StatementExercise :exercise="selectedExercise"/>
                        </div>

                    </div>

                    <div class="bg-white rounded-xl shadow-sm border p-6">

                        <!-- Ejecución -->
                        <h2 class="text-lg font-semibold text-slate-800 mb-4">
                            Ejecución
                        </h2>

                        <div class="max-h-[450px] overflow-auto bg-slate-50 rounded p-4">
                            <ExecutionExercise :exercise="selectedExercise"/>
                        </div>

                    </div>

                </div>

            </main>
        </div>

        <footer class="bg-slate-900 text-white text-center p-4 text-sm">
            Desarrollo de Aplicaciones Web — Prof. Manuel Romero
        </footer>

    </div>
</template>
