import { tourStep } from "@/Composable/TourDSL";
import { nameRef } from "@/Composable/UseModal";
import { nextTick } from "vue";
import { useCancelableTyping } from "@/Composable/UseCancelableTyping";

export function FillMenuRegisterName(tour: any) {
    const typing = useCancelableTyping();

    tourStep(tour, 'fill-name-register')
        .title('Rellenando el formulario (name)')
        .text('Insertamos un nombre.')
        .arrow(true)
        .back('Atrás', () => {
            typing.cancel();
            const input = nameRef.value as HTMLInputElement | null;
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
        .attachLater(() => nameRef.value as any, 'right')
        .offset(12)
        // al mostrarse: escribir
        .onShow(async () => {
            typing.reset();
            await typing.typeInto(nameRef.value as HTMLInputElement, "Usuario Ejemplo", 60);
        })

        // opcional: al ocultarse
        .onHide(() => {
            // si quieres: typing.cancel()
        })

        .end();
}
