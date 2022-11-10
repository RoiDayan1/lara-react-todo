<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Search for User records.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => 'nullable|string',
        ]);

        $users = User::query()->orderBy('created_at');

        if (!empty($validated['search'])) {
            $users = $users->where('name', 'like', "%{$validated['search']}%")
                ->orWhere('email', 'like', "%{$validated['search']}%");;
        }

        return $this->success($users->get());
    }
}
