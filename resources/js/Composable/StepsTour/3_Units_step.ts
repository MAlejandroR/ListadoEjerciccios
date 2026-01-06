
import { offset} from "@floating-ui/dom";

import { sidebarExercisesRef} from "@/Composable/UseModal.js";
import {ShowExercises} from "@/Composable/StepsTour/02_Exercises/01_ShowExercises.js";
import {MarkExercisesAsPracticed} from "@/Composable/StepsTour/02_Exercises/03_MarkExercisesAsPracticed.js";
import {ListThemeExercises} from "@/Composable/StepsTour/02_Exercises/02_ListThemeExercises.js";

export function Units (tour: any){
    ShowExercises(tour);
    ListThemeExercises(tour);
    MarkExercisesAsPracticed(tour);
}
