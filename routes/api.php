<?php

use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TasksController;
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

Route::prefix('users')->group(function () {
    Route::get('/', function () {
        return "asdasdasd";
    });
});

Route::prefix('projects')->group(function () {
    Route::post('/', [ProjectsController::class, 'create']);
    Route::get('/{project}', [ProjectsController::class, 'get']);
    Route::put('/{project}', [ProjectsController::class, 'update']);
    Route::delete('/{project}', [ProjectsController::class, 'delete']);
});

Route::prefix('tasks')->group(function () {
    Route::post('/', [TasksController::class, 'create']);
    Route::get('/{task}', [TasksController::class, 'get']);
    Route::put('/{task}', [TasksController::class, 'update']);
    Route::delete('/{task}', [TasksController::class, 'delete']);
});

