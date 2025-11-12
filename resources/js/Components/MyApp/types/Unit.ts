import {Exercise} from "@/Components/MyApp/types/Exercise";

export interface Unit {
    id: number;
    title: string;
    description?: string;
    folder_name?: string;
    show_in_list: boolean;
    number?: number;
    exercises?: Exercise[];
}
