import { MainRegister } from "@/Composable/StepsTour/01_Register/01_MainRegister";
import {OpenMenuRegister} from "@/Composable/StepsTour/01_Register/03_OpenMenuRegister";
import {FillMenuRegister} from "@/Composable/StepsTour/01_Register/04_FillMenuRegister";
import {PressSubmitRegisterOption} from "@/Composable/StepsTour/01_Register/FillField/06_PressSubmitRegisterOption";



export function Register (tour: any){
// PASO 1
    MainRegister(tour);
    OpenMenuRegister(tour);
    FillMenuRegister(tour);
    PressSubmitRegisterOption(tour)

}
