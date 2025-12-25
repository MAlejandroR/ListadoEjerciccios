
import { offset} from "@floating-ui/dom";

import { sidebarExercisesRef} from "@/Composable/UseModal.js";
import {ShowExercises} from "@/Composable/StepsTour/Exercises/01_ShowExercises.js";
import {MarkExercisesAsPracticed} from "@/Composable/StepsTour/Exercises/03_MarkExercisesAsPracticed.js";
import {ListThemeExercises} from "@/Composable/StepsTour/Exercises/02_ListThemeExercises.js";

export function Units (tour: any){
    ShowExercises(tour);
    ListThemeExercises(tour);
    MarkExercisesAsPracticed(tour);
}
