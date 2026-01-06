

import { FillMenuRegisterName } from "@/Composable/StepsTour/01_Register/FillField/01_FillMenuRegisterName.js";
import { FillMenuRegisterEmail } from "./FillField/02_FillMenuRegisterEmail.js";
import { FillMenuRegisterPassword } from "./FillField/03_FillMenuRegisterPassword.js";
import { FillMenuRegisterConfirmPassword } from "./FillField/04_FillMenuRegisterConfirmPassword.js";
import {FillMenuRegisterSelectCourse} from "@/Composable/StepsTour/01_Register/FillField/04_FillMenuRegisterSelectCourse";


export function FillMenuRegister(tour:any) {
    FillMenuRegisterName(tour);
    FillMenuRegisterEmail(tour);
    FillMenuRegisterPassword(tour);
    FillMenuRegisterConfirmPassword(tour);
    FillMenuRegisterSelectCourse(tour)
}
