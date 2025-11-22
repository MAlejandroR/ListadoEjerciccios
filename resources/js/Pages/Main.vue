<script setup lang="ts">
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";
import HeaderContent from "@/Pages/Layouts/HeaderContent.vue";
import StatementExercise from "@/Components/MyApp/Main/StatementExercise.vue";
import ExecutionExercise from "@/Components/MyApp/Main/ExecutionExercise.vue";
import ModalLogin from "@/Pages/Auth/ModalLogin.vue";
import ModalRegister from "@/Pages/Auth/ModalRegister.vue";
import { ref } from "vue";

import type { Unit } from "@/Components/MyApp/types/Unit";
import type { Exercise } from "@/Components/MyApp/types/Exercise";
import type { Course } from "@/Components/MyApp/types/Course";
import FooterContent from "@/Pages/Layouts/FooterContent.vue";

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
                <HeaderContent
                    title="Listado de Ejercicios de PHP"
                    @open-register="show_register = true"
                    @open-login="show_login = true"
                />

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
                        <StatementExercise :exercise="selectedExercise" />

                    </section>

                    <!-- EJECUCIÓN --->

                    <section class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Ejecución</h2>
                            <ExecutionExercise :exercise="selectedExercise" />

                    </section>

                </div>

            </main>

        </div>

        <!-- FOOTER -->
        <FooterContent />

        <!-- Modales -->
        <ModalLogin title="Login" :show="show_login" @close="show_login = false" />
        <ModalRegister title="Resgistrarse" :show="show_register"
                       @close="show_register =false"/>
    </div>
</template>
