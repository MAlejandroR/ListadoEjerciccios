import {ref} from 'vue';

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

