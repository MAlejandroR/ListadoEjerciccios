import {offset} from "@floating-ui/dom";
import {useAuth} from "@/Composable/useAuth";
import {router} from "@inertiajs/vue3";
import axios from "axios";
import {tourStep} from "@/Composable/TourDSL";

export function Logout(tour: any) {
    const {logout} = useAuth();
    tourStep(tour, "step-logout")
        .title("Logout")
        .text("Para deloguearte de la aplicación")
        .attachLater("#logout","bottom")
        .offset(20)
        // .back("Atrás")
        .next("Siguiente",()=> {
            //@ts-ignore
            axios.post(route('tour-reset'))

            router.reload({
                only: ['auth', 'units'],
                //@ts-ignore
                preserveState: false
            });
        })
        .end()
}
