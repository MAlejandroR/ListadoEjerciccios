<script setup lang="ts">
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";
import HeaderTitle from "@/Pages/Layouts/HeaderTitle.vue";
import StatementExercise from "@/Components/MyApp/Main/StatementExercise.vue";
import ExecutionExercise from "@/Components/MyApp/Main/ExecutionExercise.vue";
import ModalLogin from "@/Components/MyApp/ModalLogin.vue";
import ModalRegister from "@/Components/MyApp/ModalRegister.vue";
import { ref } from "vue";

import type { Unit } from "@/Components/MyApp/types/Unit";
import type { Exercise } from "@/Components/MyApp/types/Exercise";
import type { Course } from "@/Components/MyApp/types/Course";

const props = defineProps<{
    units: Unit[];
    exercises: Exercise[];
    courses: Course[];
    practiced: number[];
}>();

const show_login = ref(false);
const show_register = ref(false);

const selectedExercise = ref<Exercise | null>(null);

const showStatement = (exercise: Exercise) => {
    selectedExercise.value = exercise;
};
</script>

<template>
    <div class="flex flex-col min-h-screen bg-gray-50">

        <!-- TOP BAR Filament-like -->
        <header class="bg-white border-b border-gray-200 shadow-sm">
            <div class="px-6 py-4">
                <HeaderTitle
                    title="Listado de Ejercicios de PHP"
                    @open-register="show_register = true"
                    @open-login="show_login = true"
                />
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">

            <!-- Sidebar -->
            <SidebarExercises
                :units="units"
                :exercises="exercises"
                :practiced="practiced"
                @statement="showStatement"
            />

            <!-- MAIN CONTENT Filament-style -->
            <main class="flex-1 overflow-auto p-6">

                <div class="space-y-6">

                    <!-- ENUNCIADO --->

                    <section class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Enunciado</h2>

                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 min-h-[260px]">
                            <StatementExercise :exercise="selectedExercise" />
                        </div>
                    </section>

                    <!-- EJECUCIÓN --->

                    <section class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Ejecución</h2>

                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 min-h-[260px]">
                            <ExecutionExercise :exercise="selectedExercise" />
                        </div>
                    </section>

                </div>

            </main>

        </div>

        <!-- FOOTER -->
        <footer class="text-center text-sm text-gray-500 py-4">
            Desarrollo de Aplicaciones Web — Prof. Manuel Romero
        </footer>

        <!-- Modales -->
        <ModalLogin :show="show_login" @close="show_login = false" />
        <ModalRegister :show="show_register" @close="show_register = false" />
    </div>
</template>
