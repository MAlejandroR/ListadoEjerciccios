import { MainRegister } from "@/Composable/StepsTour/Register/01_MainRegister.js";
import {MenuRegister} from "@/Composable/StepsTour/Register/02_MenuRegister.js";
import {OpenMenuRegister} from "@/Composable/StepsTour/Register/03_OpenMenuRegister.js";
import {FillMenuRegister} from "@/Composable/StepsTour/Register/04_FillMenuRegister.js";


export function Register (tour: any){
// PASO 1
    MainRegister(tour);
    OpenMenuRegister(tour);
    FillMenuRegister(tour);
   // UserRegisted(tour);
}
