import {ClickEmail} from "@/Composable/StepsTour/Email/01_ClickEmail";
import {FormEmail} from "@/Composable/StepsTour/Email/02_FormEmail";

export function Email(tour:any){

    ClickEmail(tour);
    FormEmail(tour);
}
