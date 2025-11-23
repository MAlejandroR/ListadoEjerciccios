<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Services\UserCourseContentService;
use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Models\Unit;



class MainController extends Controller
{
    //
    public function __invoke(Request $request)
    {

        $user = auth()->user()??null;

        //Return one array with (units of user, exercise avary unit, exercises practiqued by this user, $dir of this course)
        $content=\App\Http\Services\UserCourseContentService::getContent($user);
        $content["courses"]= Course::all();



        return inertia('Main', $content);
    }


}
