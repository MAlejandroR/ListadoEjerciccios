import { tourStep } from "@/Composable/TourDSL";
import { OpenRegisterMenu, CloseRegisterMenu } from "@/Composable/HelperOpenWindow";
import { modalRegisterRef } from "@/Composable/UseModal";

export function OpenMenuRegister(tour: any) {

    tourStep(tour, 'menu-register')
        .classes('shepherd-theme-default')
        .title('Menú Registrarse')
        .text('Rellena el formulario para registrase, es muy sencillo<br />Selecciona el curso')
        .arrow(true)

        .back('Atrás', () => {
            CloseRegisterMenu();
        })

        .next('Siguiente')

        // Antes de mostrar, abrimos modal (Vue) y esperamos target
        .beforeShow(async () => {
            await OpenRegisterMenu();
            // aquí no necesitas polling si tu helper ya garantiza visibilidad
        })

        // Attach dinámico: se resuelve cuando el modal ya exista
        .attachLater(() => modalRegisterRef.value, 'left')
        .placement('left')
        .offset(16)
        .flip(['right', 'top', 'bottom'])

        .end();
}
