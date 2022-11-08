<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * return json response with default status code 200
     *
     * @param object|array|null $data
     * @param int $statusCode
     * @return JsonResponse
     */
    public function success(object|array|null $data = null, int $statusCode = 200): JsonResponse
    {
        return response()->json($data)->setStatusCode($statusCode);
    }


    /**
     * return json response with default status code 400
     *
     * @param array<string> $errors
     * @param int $statusCode
     * @return JsonResponse
     */
    public function error(array $errors = ['Something went wrong'], int $statusCode = 400): JsonResponse
    {
        return response()->json($errors)->setStatusCode($statusCode);
    }
}
