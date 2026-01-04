import {offset} from "@floating-ui/dom";
import {tourStep} from "@/Composable/TourDSL";
import {nameRef} from "@/Composable/UseModal";

export function MainRegister(tour: any) {
    tourStep(tour, "step-register")
        .title("Registrarse")
        .text("      Regístrate para matricularte en un curso y desbloquear los ejercicios del temario.\n")
        .attachLater("#register","bottom")
        .arrow(true)
        .offset(20)
        .next()
        .back()
        .end()
}
