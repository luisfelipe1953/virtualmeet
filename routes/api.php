<?php

use App\Http\Controllers\APIcontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/evento', [APIcontroller::class, 'evento']);
Route::get('/speakers', [APIcontroller::class, 'ponentes']);
Route::get('/ponente', [APIcontroller::class, 'ponente']);
Route::get('/gifts', [APIcontroller::class, 'regalos']);

