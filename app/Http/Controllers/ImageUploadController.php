<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Postimage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImageUploadController extends Controller
{

    //Add image
    public function addImage(){
        return view('add_image');
    }
    //Store image


public function storeImage(Request $request)
{
    $validator = Validator::make($request->all(), [
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust max file size as needed
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator);
    }

    $file = $request->file('image');
    $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

    // Resize and optimize the image with specified quality
    Image::make($file)->fit(800, 600)->save(public_path('public/Image/' . $filename), 80);

    $data = new Postimage();
    $data->image = $filename;
    $data->save();

    return redirect()->route('images.view');
}

		//View image
//View post
public function viewImage(){
    $imageData= Postimage::all();
    return view('view_image', compact('imageData'));
}
    

}
