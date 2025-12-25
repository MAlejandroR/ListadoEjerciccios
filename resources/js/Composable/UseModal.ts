import {ref} from 'vue';
import SidebarExercises from "@/Components/MyApp/SidebarExercises.vue";

export const showRegister = ref(false);
export const showLogin = ref(false);
export const showEmail = ref(false);

export const modalRegisterRef = ref<HTMLElement | null>(null);

export const nameRef = ref<HTMLElement | null>(null);
export const lastNameRef = ref<HTMLElement | null>(null);
export const emailRef = ref<HTMLElement | null>(null);
export const passwordRef = ref<HTMLElement | null>(null);
export const confirmPasswordRef = ref<HTMLElement | null>(null);
export const selectCourseRef = ref<HTMLElement | null>(null);

export const registerButtonRef   = ref<HTMLElement | null>(null);

export const tokenRef=ref(null);
export const UserRegistredLabelRef=ref<HTMLElement | null>(null);

export const sidebarExercisesRef = ref<InstanceType<typeof SidebarExercises> | null>(null);




