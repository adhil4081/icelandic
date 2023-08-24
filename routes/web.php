<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\StoreImageController;
use App\Http\Controllers\ImageUploadController;

use Illuminate\Support\Facades\Route;
use PhpParser\Node\Name;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/home', [PageController::class,'home'])->name('components.index');
Route::get('/login', [PageController::class,'login'])->name('components.login');

Route::get('store_image', [StoreImageController::class,'index']);

Route::post('store_image/insert_image',[StoreImageController::class,'insert_image']);

Route::get('store_image/fetch_image/{id}',[StoreImageController::class,'fetch_image']);

//For adding an image
Route::get('/add-image',[ImageUploadController::class,'addImage'])->name('images.add');

//For storing an image
Route::post('/store-image',[ImageUploadController::class,'storeImage'])
->name('images.store');

//For showing an image
Route::get('/view-image',[ImageUploadController::class,'viewImage'])->name('images.view');

