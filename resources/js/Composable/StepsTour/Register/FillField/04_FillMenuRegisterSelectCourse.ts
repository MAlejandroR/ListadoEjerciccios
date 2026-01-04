import {confirmPasswordRef, selectCourseRef} from "@/Composable/UseModal.js";
import {offset} from "@floating-ui/dom";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";
import {tourStep} from "@/Composable/TourDSL";

export function FillMenuRegisterSelectCourse(tour: any) {
    const typing = useCancelableTyping();

    tourStep(tour, "'fill-course-register'")
        .title("Rellenando el formulario (course)")
        .text("Seleccionamos un curso del menú desplegable.")
        .arrow(true)
        .back("Atrás", () => {
            typing.cancel();
            const select = selectCourseRef.value as HTMLSelectElement | null;
            if (!select) return
            select.selectedIndex = 0; //Seleccionamos la primera opción
            select.dispatchEvent(new Event("change", {bubbles: true}));
            select.blur();
        })
        .next("Siguiente")
        .beforeShow(async () => {
                await nextTick();
            }
        )

        .attachLater(() => selectCourseRef.value as any, "right")
        .offset(12)
        //Asegura de tener el elemento del dom montado
        .onShow(() => {
            typing.reset()
            // obtener el select desde el ref
            const select = selectCourseRef.value as HTMLSelectElement | null;
            if (!select) return;
            const opt = select.options[3];
            if (!opt) return
            select.value = opt.value;
            select.dispatchEvent(new Event("change", {
                bubbles: true
            }));
        })
        .end()


}
