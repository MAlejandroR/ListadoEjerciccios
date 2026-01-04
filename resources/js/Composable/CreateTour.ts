import Shepherd from 'shepherd.js';
import {Welcome} from '@/Composable/StepsTour/1_WelcomeStep';
import {Register} from "@/Composable/StepsTour/2_Register_1_Step";
import {Units} from "@/Composable/StepsTour/3_Units_step";
import {Logout} from "@/Composable/StepsTour/5_Logout_step";
import {Login} from "@/Composable/StepsTour/6_Login_step";
import {Email} from "@/Composable/StepsTour/7_Email_step";
import axios from "axios";
import {inject, nextTick, Ref} from "vue";
import {modalRegisterRef, showRegister} from "@/Composable/UseModal";

async function resetTourSession() {
    // ensure axios sends cookies
    axios.defaults.withCredentials = true;
    try {
        const response = await axios.post('tour/reset');
        console.log("Tour user reset response:", response.data);
        if (response.data?.csrf) {
            const meta = document.querySelector('meta[name="csrf-token"]');
            // Actualizamos axios default header
            axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf;
            // Actualizamos la meta tag si existe para que otras librerías también la lean
            meta?.setAttribute('content', response.data.csrf);
        }
    } catch (error) {
        console.error("Error resetting tour user:", error);
        return;
    }
}

async function deleteTourUser() {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.delete('deleteUserTour');

        console.log('Delete tour user response:', response.data);

        if (response.data?.csrf) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf;

            const meta = document.querySelector('meta[name="csrf-token"]');
            meta?.setAttribute('content', response.data.csrf);
        }
    } catch (error) {
        console.error('Error deleting tour user:', error);
    }
}
function CreateTour(isTourActive?: Ref<boolean>) {
    //Lo primero borrar si existe el usuario de ejemplo del tour
if (isTourActive)
    isTourActive.value = true;



    async function startTour() {
        await resetTourSession();
        await deleteTourUser();



        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                classes: "shepherd-fancy tour-border bg-white " +
                    "p-6 rounded-2xl shadow-xl max-w-md text-4xl font-semi",
                // scrollTo: false,
                scrollTo: {behavior: 'smooth', block: 'center'},
                cancelIcon: {enabled: true}
            }
        });
        Welcome(tour);
        Register(tour);
        Units(tour);
        Logout(tour);
        Email(tour);
        Login(tour);

        tour.start();
    }

    return {startTour};
}

export default CreateTour
