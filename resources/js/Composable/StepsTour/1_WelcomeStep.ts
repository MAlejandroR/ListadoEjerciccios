import {tourStep} from "@/Composable/TourDSL";

export function Welcome(tour: any) {
// PASO 1
    tourStep(tour, "welcome")
        .title("Bienvenido 👋")
        .text("Esta plataforma está diseñada para practicar ejercicios interactivos de PHP.")
        .next()
        .end()
}
