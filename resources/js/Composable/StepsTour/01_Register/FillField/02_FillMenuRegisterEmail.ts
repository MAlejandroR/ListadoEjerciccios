import {emailRef, nameRef} from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";
import {tourStep} from "@/Composable/TourDSL";

export function FillMenuRegisterEmail(tour: any) {
    const typing = useCancelableTyping();

    tourStep(tour, "fill-email-register")
        .title(" Rellenando el formulario (email)")
        .text("Inserta un  email correcto y no repetido")
        .arrow(true)
        .back('Atrás', () => {
            typing.cancel();
            const input = emailRef.value as HTMLInputElement | null;
            if (input) {
                input.value = "";
                input.dispatchEvent(new Event("input", {bubbles: true}));
                input.blur();
            }
        })
        .next()
        // antes de mostrar: aseguramos DOM listo y definimos attach dinámico al input
        .beforeShow(async () => {
            await nextTick();
        })
        .attachLater(() => emailRef.value as any, 'right')
        .offset(12)
        // al mostrarse: escribir
        .onShow(async () => {
            typing.reset();
            await typing.typeInto(emailRef.value as HTMLInputElement, "usuario_prueba@gmail.com", 60);
        })

        // opcional: al ocultarse
        .onHide(() => {
            // si quieres: typing.cancel()
        })
        .end();
}
