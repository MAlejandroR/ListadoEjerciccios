<?php
if (!function_exists("get_folder_exercises")){
    function get_folder_exercises(?string $dir=null):array{
        //$directories = Storage::directories("exercises");
        $path= $dir ? "exercises/$dir/" : "exercises";
        $directories = Storage::disk("public")->directories($path);
        return collect($directories)
            ->mapWithKeys(fn($dir)=>[basename($dir)=>basename($dir)])
            ->sortKeys()
            ->toArray();
    }
}
