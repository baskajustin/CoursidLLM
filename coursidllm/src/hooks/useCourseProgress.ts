"use client";

import { useState, useCallback } from "react";

interface LessonProgress {
  lessonId: string;
  watchedSeconds: number;
  completed: boolean;
}

interface UseCourseProgressOptions {
  enrollmentId: string;
  totalLessons: number;
}

export function useCourseProgress({ enrollmentId, totalLessons }: UseCourseProgressOptions) {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});

  const markLessonComplete = useCallback(
    async (lessonId: string) => {
      setProgress((prev) => ({
        ...prev,
        [lessonId]: { lessonId, watchedSeconds: 0, completed: true },
      }));

      try {
        await fetch(`/api/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollmentId, lessonId, completed: true }),
        });
      } catch (err) {
        console.error("Failed to save lesson progress:", err);
      }
    },
    [enrollmentId]
  );

  const updateWatchedSeconds = useCallback(
    async (lessonId: string, watchedSeconds: number) => {
      setProgress((prev) => ({
        ...prev,
        [lessonId]: {
          lessonId,
          watchedSeconds,
          completed: prev[lessonId]?.completed ?? false,
        },
      }));
    },
    []
  );

  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    progress,
    progressPercent,
    completedCount,
    markLessonComplete,
    updateWatchedSeconds,
  };
}
