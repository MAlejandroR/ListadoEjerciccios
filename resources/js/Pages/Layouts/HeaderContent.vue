<script setup lang="ts">
import { Menu, X } from "lucide-vue-next"; // icons mobile menu
import { computed, ref } from "vue";
import { usePage, router } from "@inertiajs/vue3";

const props = defineProps<{ title: string }>();
const emit = defineEmits(["open-login", "open-register","open-email"]);

const page = usePage();
const user = computed(() => page.props.auth?.user);

const logout = () => router.post(route("logout"));

const mobileOpen = ref(false);
</script>

<template>
    <header class="bg-white border-b shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <!-- LEFT: Logo + Title -->
            <div class="flex items-center gap-3">
                <img src="/images/logo.png" class="h-10 w-auto" alt="Logo" />

                <h1 class="text-xl md:text-2xl font-bold italic text-slate-800 whitespace-nowrap">
                    {{ title }}
                </h1>
            </div>

            <!-- RIGHT DESKTOP -->
            <div class="hidden md:flex items-center gap-2">

                <template v-if="user">
                    <span class="text-slate-600">{{ user.name }}</span>
                    <button
                        @click="logout"
                        class="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </template>
                <template v-else>
                    <button
                        @click="emit('open-login')"
                        class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Login
                    </button>
                    <button
                        @click="emit('open-register')"
                        class="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-900  cursor-pointer"
                    >
                        Register
                    </button>

                </template>
                <button
                    @click="emit('open-email')"
                    class="px-3 py-1 rounded bg-green-700 text-white hover:bg-red-700"
                >
                    Enviar Email
                </button>
            </div>

            <!-- RIGHT MOBILE: HAMBURGER -->
            <button
                class="md:hidden p-2 text-slate-700 hover:text-black"
                @click="mobileOpen = !mobileOpen"
            >
                <component :is="mobileOpen ? X : Menu" class="w-6 h-6" />
            </button>
        </div>

        <!-- MOBILE MENU -->
        <div
            v-if="mobileOpen"
            class="md:hidden border-t bg-white px-4 py-3"
        >
            <template v-if="user">
                <div class="mb-3 text-slate-600">{{ user.name }}</div>

                <button
                    @click="logout"
                    class="w-full mb-2 px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                    Logout
                </button>

            </template>

            <template v-else>
                <button
                    @click="emit('open-login'); mobileOpen = false"
                    class="w-full mb-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                    Login
                </button>
                <button
                    @click="emit('open-register'); mobileOpen = false"
                    class="w-full px-3 py-2 rounded bg-slate-700 text-white hover:bg-slate-900"
                >
                    Register
                </button>

            </template>

        </div>
    </header>
</template>
<style scoped>

</style>
