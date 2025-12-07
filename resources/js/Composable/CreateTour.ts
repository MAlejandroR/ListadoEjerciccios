import Shepherd from 'shepherd.js';
import {Welcome} from '@/Composable/StepsTour/1_WelcomeStep';
import {Register} from "@/Composable/StepsTour/2_Register_1_Step";
import {Email} from "@/Composable/StepsTour/3_Email_step";
import {Login} from "@/Composable/StepsTour/4_Login_1_step";
import {Units} from "@/Composable/StepsTour/6_Units_step";
import {Exercises} from "@/Composable/StepsTour/5_Exercises_step";



export function CreateTour() {
    function startTour() {

        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                classes: "shepherd-fancy tour-border bg-white p-6 rounded-2xl shadow-xl max-w-md text-4xl font-semi",
                // scrollTo: false,
                scrollTo: {behavior: 'smooth', block: 'center'},
                cancelIcon: {enabled: true}
            }
        });
        Welcome(tour);
        Register(tour);
        Email(tour);
        Login(tour);
        Units(tour);
        Exercises(tour);
        tour.start();
    }

    return {startTour};
}


