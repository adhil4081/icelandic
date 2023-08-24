<?php

namespace App\Http\Controllers;

use App\Models\Postimage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class ImageApiController extends Controller
{
    public function image(){
        $image=Postimage::all();
        return response()->json($image);
    }


public function show($id)
{
    $image = Postimage::findOrFail($id);

    $imagePath = public_path('public/Image/' . $image->image);

    if (file_exists($imagePath)) {
        $fileContents = file_get_contents($imagePath);

        return new Response($fileContents, 200, [
            'Content-Type' => 'image/jpeg', // Adjust content type based on your image type
        ]);
    } else {
        abort(404);
    }
}

}
