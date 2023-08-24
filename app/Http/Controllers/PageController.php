<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\Component;

class PageController extends Controller
{
    
    public function home(){
    return view('components.index');
    }
    public function login(){
        return view('components.login');
        }
        

}
