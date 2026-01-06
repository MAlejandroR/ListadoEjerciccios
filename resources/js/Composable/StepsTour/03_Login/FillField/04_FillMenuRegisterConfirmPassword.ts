

import {confirmPasswordRef} from "@/Composable/UseModal.js";
import {nextTick} from "vue";
import {useCancelableTyping} from "@/Composable/UseCancelableTyping.js";
import {tourStep} from "@/Composable/TourDSL";

export function FillMenuRegisterConfirmPassword(tour:any) {
    const typing = useCancelableTyping();

    tourStep(tour,"fill-confirm-password-register")
        .title("Rellenando el formulario (confirm-password)")
        .text("Volvemos a insertar la contraseña para confirmarla.")
        .arrow(true)
        .back("Atrás", ()=>{
            typing.cancel();
            const input = confirmPasswordRef.value as HTMLInputElement | null
            if (!input) return;
            input.value="";
            input.dispatchEvent(new Event("input", {bubbles:true}))
            input.blur();
        })
        .next('Siguiente')
        .beforeShow(async()=>{
            await nextTick();
        })
        .attachLater(()=>confirmPasswordRef.value as any, 'right')
        .offset(12)
        .onShow(async()=>{
            typing.reset();
            await typing.typeInto(confirmPasswordRef.value as HTMLInputElement, "12345678", 60);
        })
        .end()

}
