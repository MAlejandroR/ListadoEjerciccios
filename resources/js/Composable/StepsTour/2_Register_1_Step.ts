import { MainRegister } from "@/Composable/StepsTour/Register/01_MainRegister";
import {OpenMenuRegister} from "@/Composable/StepsTour/Register/03_OpenMenuRegister";
import {FillMenuRegister} from "@/Composable/StepsTour/Register/04_FillMenuRegister";
// import {UserRegisted} from "@/Composable/StepsTour/Register/05_UserRegisted";


export function Register (tour: any){
// PASO 1
    MainRegister(tour);
    OpenMenuRegister(tour);
    FillMenuRegister(tour);
    // UserRegisted(tour);
}
