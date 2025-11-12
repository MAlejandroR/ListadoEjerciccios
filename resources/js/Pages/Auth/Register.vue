<script setup lang="ts">
import InputError from '@/Components/Utilities/InputError.vue';
import InputLabel from '@/Components/Utilities/InputLabel.vue';
import PrimaryButton from '@/Components/Utilities/PrimaryButton.vue';
import TextInput from '@/Components/Utilities/TextInput.vue';
import {Head, Link, useForm, usePage} from '@inertiajs/vue3';
import {computed} from "vue";


const props = defineProps<{courses:Course[]}>();
const page = usePage();
const user = computed(() => page.props.auth?.user ?? {name: "Invitado", is_admin: false});

const form = useForm({
    nick:'',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    course_id:'',
});

const emit = defineEmits<{(e:"register_success"):void}>();



const submit = () => {
    form.post(route('register'), {
        onSuccess: () => {
            form.reset('password', 'password_confirmation');
            emit("register_success");
            //Actualizar los datos del props ????
            if (page?.auth?.user)
                //Por si la respuesta es visit y no un json
                usePage().props.auth.user = page.props.auth.user
        },
        onError:()=>{
            console.warn("Error al registrar el estudante ".form.error)
        },
        onFinish: async(response)=>{
            // Si la respuesta es JSON (tu caso)
            if (response && response.status === 200 && response.data?.user) {
                const inertiaPage = usePage();
                inertiaPage.props.auth = inertiaPage.props.auth || {};
                inertiaPage.props.auth.user = response.data.user;
            }
        }

    });

};
</script>

<template>
        <Head title="Register" />

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :message="form.errors.name" />
            </div><div>
                <InputLabel for="nick" value="Nick" />

                <TextInput
                    id="nick"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.nick"
                    required
                    autofocus
                    autocomplete="nick"
                />

                <InputError class="mt-2" :message="form.errors.nick" />
            </div>

            <div class="mt-4">
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel
                    for="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <InputError
                    class="mt-2"
                    :message="form.errors.password_confirmation"
                />
            </div>
            <div class="mt-4">
                <InputLabel
                    for="curso"
                    value="Selecciona curso"
                />

                <select class="select select-neutral" v-model="form.course_id">
                  <option v-for="course in courses" :key="course.id" :value="course.id">{{course.name}}</option>
               </select>
            </div>
            <div class="mt-4 flex items-center justify-end">
                <Link
                    :href="route('login')"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Already registered?
                </Link>

                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Register
                </PrimaryButton>
            </div>
        </form>
</template>
