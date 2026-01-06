import {offset} from "@floating-ui/dom";
import {tourStep} from "@/Composable/TourDSL";
import {nameRef} from "@/Composable/UseModal";

export function MainLogin(tour: any) {
    tourStep(tour, "step-login")
        .title("Login")
        .text("Una vez Registrado nos podremos loguear con las credenciales establecidas")
        .attachLater("#login","bottom")
        .arrow(true)
        .offset(20)
        .next()
        .back()
        .end()
}
