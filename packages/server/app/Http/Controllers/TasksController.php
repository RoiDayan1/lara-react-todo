<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Search for Task records.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'search' => 'nullable|string',
        ]);

        $tasks = Task::query()->orderBy('created_at');

        if (!empty($validated['search'])) {
            $tasks = $tasks->where('description', 'like', "%{$validated['search']}%");
        }
        if (!empty($validated['project_id'])) {
            $tasks = $tasks->where('project_id', '=', $validated['project_id']);
        }

        return $this->success($tasks->get());
    }

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
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
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
            'project_id' => 'exists:projects,id',
            'user_id' => 'exists:users,id',
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

    /**
     * Increment Task views.
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function view(Task $task): JsonResponse
    {
        $task->increment('views');

        return $this->success($task);
    }

}
