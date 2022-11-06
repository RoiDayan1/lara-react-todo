<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Create a new Task record.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'string',
            'state' => 'string|in:Todo,Done',
            'views' => 'integer',
            'project_id' => 'required|exists:projects',
            'user_id' => 'required|exists:users',
        ]);

        $task = Task::query()->create($validated);

        return $this->success($task);
    }

    /**
     * Get a Task record.
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function get(Task $task): JsonResponse
    {
        return $this->success($task);
    }

    /**
     * Update a Task record.
     *
     * @param Request $request
     * @param Task $task
     * @return JsonResponse
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'string',
            'state' => 'string|in:Todo,Done',
            'views' => 'integer',
            'project_id' => 'exists:projects',
            'user_id' => 'exists:users',
        ]);

        $task->update($validated);

        return $this->success($task);
    }

    /**
     * Delete a Task record.
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function delete(Task $task): JsonResponse
    {
        $task->delete();

        return $this->success();
    }

}
