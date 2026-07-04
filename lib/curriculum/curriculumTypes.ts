export interface Resource {
  id: string;

  title: string;

  type:
    | "book"
    | "notes"
    | "ppt"
    | "video"
    | "worksheet"
    | "questionBank"
    | "activity"
    | "assessment"
    | "mcq"
    | "lessonPlan"
    | "exemplar";

  url: string;

  thumbnail?: string;
}

export interface LessonPlan {
  learningObjectives: string[];
  expectedLearningOutcomes: string[];
  prerequisiteKnowledge: string[];
  teachingMethodology: string[];
  teachingAids: string[];
  content: string[];
  classroomActivities: string[];
  artIntegration: string[];
  conceptMap: string[];
  assessment: string[];
  classwork: string[];
  homework: string[];
  remedialMeasures: string[];
  enrichmentActivities: string[];
  skills: string[];
  values: string[];
  references: string[];
}

export interface Chapter {
  chapterNo: number;

  title: string;

  competencies: string[];

  lessonPlan: LessonPlan;

  resources: Resource[];
}