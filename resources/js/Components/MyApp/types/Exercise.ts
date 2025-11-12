
export interface Exercise{
    id: number;
    list_title:string;
    exercise_title:string;
    description?:string;
    wiki_url?:string;
    index_name:string;
    show_in_list:boolean;
    show_source:boolean;
    units_id:number;
    folder_name?:string;
    unit?:{
        id: number;
        title:string;
        folder_name?:string
    }
}
