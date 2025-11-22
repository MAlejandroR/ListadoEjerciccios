<script setup>
import { Github,FileCode, Mail,  Heart } from "lucide-vue-next";
</script>

<template>
    <footer class="bg-slate-900 text-gray-300 py-6 mt-10">
        <div class="max-w-7xl mx-auto px-4 flex flex-col gap-6">

            <!-- MAIN LINE: important content -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <!-- Text + heart -->
                <p class="flex text-base items-center gap-1 text-gray-300">
                    Hecho con <Heart class="w-5 h-5 text-red-500" /> para mis compañer@s de estudio
                </p>

                <!-- Social / links -->
                <div class="flex gap-6 text-base">
                    <a href="https://web.infenlaces.com/dwes" class="flex items-center gap-1 hover:text-white">
                        <FileCode class="w-5 h-5" /> Apuntes PHP
                    </a>

                    <a href="https://github.com/MAlejandroR/ListadoEjerciccios" target="_blank" class="flex items-center gap-1 hover:text-white">
                        <Github class="w-5 h-5" /> GitHub
                    </a>

                    <a href="mailto:manuel@example.com" class="flex items-center gap-1 hover:text-white">
                        <Mail class="w-5 h-5" /> Contacto
                    </a>
                </div>
            </div>

            <!-- Separator -->
            <hr class="border-slate-700" />

            <!-- SECOND LINE: small CC license -->
            <div class="flex flex-col md:flex-row items-start md:items-center gap-2 text-gray-400 text-xs">

                <div class="flex items-center gap-2 opacity-80">
                    <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" class="w-5 h-5" alt="CC" />
                    <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" class="w-5 h-5" alt="BY" />
                    <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" class="w-5 h-5" alt="SA" />
                </div>

                <span class="leading-tight">
                    El contenido está disponible bajo la
                    <a
                        href="https://creativecommons.org/licenses/by-sa/3.0/"
                        target="_blank"
                        class="text-blue-400 hover:text-blue-300 underline"
                    >
                        licencia Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)
                    </a>
                    a menos que se indique lo contrario.
                </span>
            </div>

        </div>
    </footer>
</template>
