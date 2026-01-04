<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TourController extends Controller
{
    public function startTour(Request $request){
        session()->put('tour',true);
        return redirect()->back();
    }
    public function closeTour(Request $request){
        session()->flush("tour");
        return redirect()->back();
    }



   public function del_user_tour(Request $request){
       //        //Borramos el usuario de tour si existe
        $user = User::where("name","Usuario Ejemplo")->get()->first()??null;
        $deleted = false;
        if ($user) {
            $user->delete();
            $deleted = true;
        }
//Invalidamos la session
       $request->session()->invalidate();

       //Volvemos a crear la session
       $request->session()->regenerate();


       //Regeneramos el token en sesion
       $request->session()->regenerateToken();
       // Devolvemos también el token CSRF nuevo para que el cliente lo actualice
       return response()->json([
           'deleted' => $deleted,
           'message' => $deleted ? 'Tour user deleted successfully' : 'No tour user found (nothing to delete)',
           'csrf' => csrf_token(),
       ], 200);

   }
    public function reset(Request $request)
    {


        info ("Resetting all variable to begin tour user");

        //Forzamos el logout
        Auth::logout();

        //Invalidamos la session
        $request->session()->invalidate();

        //Volvemos a crear la session
        $request->session()->regenerate();


        //Regeneramos el token en sesion
        $request->session()->regenerateToken();
//TODO Pendiente de borrar el usuario
//
//        //Borramos el usuario de tour si existe
//        $user = User::where("name","Usuario Ejemplo")->get()->first()??null;
//
//        $deleted = false;
//
//        if ($user) {
//            $user->delete();
//            $deleted = true;
//        }

        // Devolvemos también el token CSRF nuevo para que el cliente lo actualice
        return response()->json([
           'csrf' => csrf_token(),
        ], 200);
        //
    }
}
