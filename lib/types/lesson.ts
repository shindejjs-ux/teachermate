export interface LessonPlanRequest {
  className: string;
  subject: string;
  chapter: string;
  duration: string;
  language: string;
}

export interface LessonPlanResponse {
  lessonPlan: string;
}