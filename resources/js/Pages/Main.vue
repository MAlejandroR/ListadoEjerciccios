<script setup lang="ts">
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";
import HeaderContent from "@/Pages/Layouts/HeaderContent.vue";
import StatementExercise from "@/Components/MyApp/Main/StatementExercise.vue";
import ExecutionExercise from "@/Components/MyApp/Main/ExecutionExercise.vue";
import ModalLogin from "@/Pages/Auth/ModalLogin.vue";
import ModalEmail from "@/Pages/Auth/ModalEmail.vue";
import ModalRegister from "@/Pages/Auth/ModalRegister.vue";
import {onMounted, ref} from "vue";

import type {Unit} from "@/Components/MyApp/types/Unit";
import type {Exercise} from "@/Components/MyApp/types/Exercise";
import type {Course} from "@/Components/MyApp/types/Course";
import FooterContent from "@/Pages/Layouts/FooterContent.vue";
import {router} from "@inertiajs/vue3";
import {showRegister, showLogin, showEmail} from "@/Composable/UseModal";


const props = defineProps<{
    units: Unit[];
    exercises: Exercise[];
    courses: Course[];
    practiced: number[];
}>();



//MRM ????? i believe these events are  never  invoke
onMounted(()=>{
    window.addEventListener('open-register-modal',()=>showRegister.value=true);
    window.addEventListener('hidden-register-modal',()=>showRegister.value=false)
});

const handleLoginSuccess = () => {
    showLogin.value = false
    router.reload({
        only: ["units", "exercises", "practiced", "dir"]
    });
}
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
                @open-register="showRegister = true"
                @open-login="showLogin = true"
                @open-email="showEmail = true"
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
                        <StatementExercise :exercise="selectedExercise"/>
                    </section>

                    <!-- EJECUCIÓN --->

                    <section class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Ejecución</h2>
                        <ExecutionExercise :exercise="selectedExercise"/>

                    </section>

                </div>

            </main>

        </div>

        <!-- FOOTER -->
        <FooterContent/>

        <!-- Modales -->
        <ModalEmail title="Enviar Correo" :show="showEmail" @close="showEmail = false"/>
        <ModalLogin title="Login" :show="showLogin" @login-success="handleLoginSuccess" @close="showLogin = false"/>
        <ModalRegister title="Resgistrarse" :show="showRegister" :courses="courses"
                       @close="showRegister =false"/>
    </div>
</template>
