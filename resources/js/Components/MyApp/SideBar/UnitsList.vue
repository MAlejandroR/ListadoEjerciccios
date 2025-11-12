<script setup>
import {defineEmits, ref} from "vue";
import UnitItem from "@/Components/MyApp/SideBar/UnitItem.vue";


const props = defineProps({groupsExercises: Object, units: Array, practiced:Array})


console.log("UntisList");
console.log("grupo de ejercicios");
console.log(props.groupsExercises);


//Recojo el evento que está propagando UnitItem que recibe de ExerciseItem y lo propago a Sidebar

const emit = defineEmits(['statement'])

const onStatement =(exercise)=>emit("statement", exercise);




</script>

<template>

    <div v-for="unit in units" :key="unit.id">
        <UnitItem :practiced="practiced" :unit="unit" :exercises="groupsExercises[unit.id] ?? []" @statement="onStatement" />
    </div>
</template>

<style scoped>

</style>
