<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    /**
     * Search for Project records.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => 'nullable|string',
        ]);

        $projects = Project::query()->orderBy('created_at');

        if (!empty($validated['search'])) {
            $projects = $projects->where('name', 'like', "%{$validated['search']}%");
        }

        return $this->success($projects->get());
    }

    /**
     * Create a new Project record.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:projects|max:255',
        ]);

        $project = Project::query()->create($validated);

        return $this->success($project);
    }

    /**
     * Get a Project record.
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function get(Project $project): JsonResponse
    {
        return $this->success($project);
    }

    /**
     * Update a Project record.
     *
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'string|unique:projects|max:255',
        ]);

        $project->update($validated);

        return $this->success($project);
    }

    /**
     * Delete a Project record.
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function delete(Project $project): JsonResponse
    {
        $project->delete();

        return $this->success();
    }

}
