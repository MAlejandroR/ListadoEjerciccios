import { tourStep } from "@/Composable/TourDSL";
import { OpenLoginMenu, CloseLoginMenu } from "@/Composable/HelperOpenWindow";
import { modalLoginRef,loginRef } from "@/Composable/UseModal";

export function OpenMenuLogin(tour: any) {

    tourStep(tour, 'menu-login')
        .classes('shepherd-theme-default')
        .title('Menú Login')
        .text('Rellena el formulario con tus credenciales')
        .arrow(true)
        .back('Atrás', () => {

            CloseLoginMenu();
        })
        .next('Siguiente')

        // Antes de mostrar, abrimos modal (Vue) y esperamos target
        .beforeShow(async () => {
            await OpenLoginMenu();
            // aquí no necesitas polling si tu helper ya garantiza visibilidad
        })

        // Attach dinámico: se resuelve cuando el modal ya exista
        .attachLater(() => modalLoginRef.value, 'left')
        .placement('left')
        .offset(16)
        .flip(['right', 'top', 'bottom'])

        .end();
}
