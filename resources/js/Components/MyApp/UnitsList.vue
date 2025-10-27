<script setup>
import { defineEmits} from "vue";
import UnitItem from "@/Components/MyApp/UnitItem.vue";


const props = defineProps({groupsExercises: Object, units: Object})

const units = props.units;
const groupsExercises = props.groupsExercises;

//Recojo el evento que está propagando UnitItem que recibe de ExerciseItem y lo propago a Sidebar

const emit = defineEmits(['statement'])

const onStatement =(exercise)=>emit("statement", exercise);




</script>

<template>

    <div v-for="unit in units" :key="unit.id">
        <UnitItem :unit="unit" :exercises="groupsExercises[unit.id]??[]" @statement="onStatement" />
    </div>
</template>

<style scoped>

</style>
