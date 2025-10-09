
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
defineProps<{title: string}>()
const goToAdmin=()=>{
    window.location.href='/admin'
};


</script>

<template>
    <!-- Any attributes you pass (like extra classes) will land on this root header via $attrs -->
    <header
        class="bg-red-700 text-white text-3xl font-bold text-center p-6 uppercase"
        v-bind="$attrs"
    >
        <h1 class="leading-tight">{{ title }}  </h1>
        <button
            class="btn btn-primary"
            @click="goToAdmin"
        >
            Ir al panel de administración
        </button>

        <!-- Optional: anything extra can be slotted below the title -->
        <slot />
    </header>
</template>

