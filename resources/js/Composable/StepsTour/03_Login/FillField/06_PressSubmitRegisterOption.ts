import {registerButtonRef} from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {tourStep} from "@/Composable/TourDSL";

export function PressSubmitRegisterOption(tour: any) {
    tourStep(tour, 'fill-register-submit')
        .title("Registramos el usuario")
        .text("Una vez registrado el usuario, podremos acceder a los ejercicios del curso seleccionado."
            + "Directamente apareceremos logueados, con la opción de logout")
        .arrow(true)
        .back("Atrás", () => {
            //Pendiente hacer un logout
        })
        .next("Siguiente", () => {
            const btn = registerButtonRef.value as HTMLButtonElement | null
            if (!btn) return
            btn.closest("form")?.requestSubmit();
            tour.complete();
        })
        .beforeShow(async () => {
            await nextTick();
        })
        .attachLater(() => registerButtonRef.value as any, "top")
        .offset(12)
        .end()
}
