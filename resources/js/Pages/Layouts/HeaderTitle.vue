<script setup lang="ts">

const props = defineProps <{title:string}>()

</script>

<template>
    <header class="bg-white border-b shadow-sm">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <!-- Title -->
            <h1 class="text-xl font-semibold text-slate-800">
                {{ title }}
            </h1>

            <!-- Auth buttons -->
            <div>
                <template v-if="user">
                    <span class="mr-4 text-slate-600">{{ user.name }}</span>
                    <button
                        @click="logout"
                        class="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </template>

                <template v-else>
                    <button
                        @click="showLoginForm"
                        class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-2"
                    >
                        Login
                    </button>

                    <button
                        @click="showRegisterForm"
                        class="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-900"
                    >
                        Register
                    </button>
                </template>
            </div>

        </div>
    </header>
</template>

<style scoped>

</style>
