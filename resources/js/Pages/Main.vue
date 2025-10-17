<script setup>
import HeaderTitle from "./Layouts/HeaderTitle.vue";
import MenuLeft from "./Components/MenuLeft.vue";
import Login from "./Auth/Login.vue";
import { ref } from "vue";

const isOpen = ref(true);
const toggle = () => { isOpen.value = !isOpen.value };
const {exercices} = defineProps({exercices: Array,units:Array});


//Cuando reciba el evento open-login tendré la variabel showLogin a true, si no a false
const showLogin = ref(false);
const handleOpenLogin = ()=> {showLogin.value=true;}
const closeLogin =  ()=> {showLogin.value=false;}


</script>

<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <!-- Header -->
        <HeaderTitle title="Prácticas de Programación PHP" @open-login="handleOpenLogin" />

        <!-- Main container -->
        <div class="flex flex-1">
            <!-- Aside siempre presente -->
            <aside
                class="bg-gray-200 transition-all duration-300 flex flex-col"
                :class="isOpen ? 'w-84 p-4' : 'w-6 p-1'"
            >
                <!-- Botón pegado al borde derecho -->
                <div class="flex justify-end">
                    <img
                        :src="isOpen ? '/images/icons/menu-desplegable-open.png' : '/images/icons/menu-desplegable-close.png'"
                        @click="toggle"
                        width="24"
                        class="bg-white border shadow rounded text-xs px-1 "
                    />
                </div>

                <!-- Contenido del menú, solo visible si isOpen -->
                <div v-show="isOpen" class="mt-4">
                    <MenuLeft :exercices="exercices" :units="units" />
                </div>
            </aside>

            <!-- Zona derecha -->
            <main class="flex flex-col flex-1 p-4 space-y-4">
                <!-- Enunciado -->
                <section class="bg-blue-200 p-6 rounded shadow">
                    <h2 class="text-xl font-bold text-center text-navy-900">
                        Aquí iría el enunciado
                    </h2>
                    <p class="mt-2">
                        Texto o descripción de la práctica seleccionada...
                    </p>
                </section>

                <!-- Ejecución -->
                <section class="bg-green-200 flex-1 p-6 rounded shadow">
                    <h2 class="text-xl font-bold text-center mb-2">Ejecución</h2>
                    <iframe
                        src="https://example.com"
                        class="w-full h-80 border"
                    ></iframe>
                </section>
            </main>
        </div>

        <!-- Footer -->
        <footer class="bg-yellow-600 text-white text-center p-4">
            Desarrollo de Aplicaciones Web en Entorno Servidor · Profesor Manuel Romero
        </footer>

        <!-- 🟢 Modal overlay for Login -->
        <div
            v-if="showLogin"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <!-- Smaller modal box -->
            <div class="bg-white/95 rounded-2xl shadow-2xl w-[380px] p-4 relative flex flex-col items-center">
                <!-- Header with close button aligned -->
                <div class="flex w-full justify-between items-center mb-3">
                    <h2 class="text-lg font-semibold text-gray-800">Login</h2>
                    <button
                        @click="closeLogin"
                        class="text-gray-500 hover:text-black text-xl leading-none"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                <!-- Login form -->
                <Login @login-success="closeLogin" />
            </div>
        </div>

    </div>
</template>

<style scoped>
.text-navy-900 {
    color: #001f3f;
}
</style>
