
import {passwordRef} from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";
import {tourStep} from "@/Composable/TourDSL";

export function FillMenuRegisterPassword(tour:any) {
    const typing = useCancelableTyping();

    tourStep(tour, 'fill-password-register')
        .title('Rellenando el formulario (password)')
        .text('Insertamos un password de 8 caracteres (no hay mas restricciones).')
        .arrow(true)
        .back('Atrás', () => {
            typing.cancel();
            const input = passwordRef.value as HTMLInputElement | null;
            if (input) {
                input.value = "";
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.blur();
            }
        })
        .next('Siguiente')
        // antes de mostrar: aseguramos DOM listo y definimos attach dinámico al input
        .beforeShow(async () => {
            await nextTick();
        })
        .attachLater(() => passwordRef.value as any, 'right')
        .offset(12)
        // al mostrarse: escribir
        .onShow(async () => {
            typing.reset();
            await typing.typeInto(passwordRef.value as HTMLInputElement, "12345678", 60);
        })

        // opcional: al ocultarse
        .onHide(() => {
            // si quieres: typing.cancel()
        })

        .end();
}
