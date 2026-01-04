import {tourStep} from "@/Composable/TourDSL";

export function ShowExercises (tour: any){
    tourStep(tour, "step-units")
    .title("Temario")
        .text("Aquí encontrarás todos los temas disponibles según tu curso.")
        .attachLater("#sidebar-exercises", "right")
        .offset(20)
        .back("Atrás")
        .next("Siguiente")
        .end()
}
