<script setup lang="ts">
import UnitsList from "@/Components/MyApp/SideBar/UnitsList.vue";
import { ref, watch, computed, defineEmits } from "vue";
import { Unit } from "@/Components/MyApp/types/Unit";
import { Exercise } from "@/Components/MyApp/types/Exercise";
import { Menu, ChevronsLeft } from "lucide-vue-next";

const props = defineProps<{ units: Unit[]; exercises: Exercise[]; practiced: number[] }>();

const emit = defineEmits(["statement"]);

// --- Sidebar state ---
const isOpen = ref(true); // <-- OPEN BY DEFAULT (as you requested)
const showContent = ref(true);

// Group exercises by unit
const groupedExercises = computed(() => {
    const groups: Record<number, Exercise[]> = {};
    for (const ex of props.exercises ?? []) {
        if (!groups[ex.unit_id]) groups[ex.unit_id] = [];
        groups[ex.unit_id].push(ex);
    }
    return groups;
});

const onStatement = (exercise: Exercise) => emit("statement", exercise);

// Toggle animation
const toggle_open = () => {
    isOpen.value = !isOpen.value;
};

watch(isOpen, (open) => {
    if (open) setTimeout(() => (showContent.value = true), 200);
    else showContent.value = false;
});
</script>

<template>
    <aside
        class="transition-all duration-300  bg-white flex flex-col"
        :class="isOpen ? 'w-72' : 'w-10'"
    >
        <!-- HEADER WITH TOGGLE -->
<!--        <div      class="flex items-center justify-between px-4 py-3  bg-gray-50"        >-->
            <div class="sidebar-header relative flex items-center justify-between px-4 py-3 bg-gray-50">

            <div v-if="isOpen" class="font-semibold text-gray-700 flex items-center gap-2">
                <Menu class="w-5 h-5" />
                Temas
            </div>

            <button
                @click="toggle_open"
                class="p-2 rounded-lg hover:bg-gray-200 transition"
            >
                <ChevronsLeft
                    v-if="isOpen"
                    class="w-5 h-5 text-gray-600"
                />
                <ChevronsLeft
                    v-else
                    class="w-5 h-5 rotate-180 text-gray-600"
                />
            </button>
        </div>

        <!-- CONTENT -->
        <div v-if="showContent" class="overflow-auto p-1 bg-gray-50">
            <UnitsList
                :practiced="practiced"
                :groupsExercises="groupedExercises"
                :units="units"
                @statement="onStatement"
            />
        </div>

        <!-- Collapsed mode shows icons only -->
        <div
            v-else
            class="flex flex-col items-center justify-start pt-1 text-gray-500 gap-3"
        >
            <Menu class="w-5 h-5" />
        </div>
    </aside>
</template>
<style scoped>
.sidebar-header::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 10px;

    background: linear-gradient(
        to bottom,
        #dbeafe 0%,
        #bfdbfe 100%
    ); /* azulito MUY suave */

    border-bottom-left-radius: 40% 20px;
    border-bottom-right-radius: 30% 20px;

    box-shadow: 0 4px 6px -4px rgba(0,0,0,0.18);
}
</style>
