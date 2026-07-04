// Local Chapter type to avoid missing module import
type LessonPlan = {
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
};

type Resources = {
  book: string;
  notes: string;
  ppt: string;
  video: string;
  worksheet: string;
  questionBank: string;
  exemplar: string;
};

type Chapter = {
  chapterNo: number;
  title: string;
  lessonPlan: LessonPlan;
  resources: Resources;
};

export const class9Mathematics: Chapter[] = [
  {
    chapterNo: 1,
    title: "Orienting Yourself: The Use of Coordinates",

    lessonPlan: {
      learningObjectives: [],
      expectedLearningOutcomes: [],
      prerequisiteKnowledge: [],
      teachingMethodology: [],
      teachingAids: [],
      content: [],
      classroomActivities: [],
      artIntegration: [],
      conceptMap: [],
      assessment: [],
      classwork: [],
      homework: [],
      remedialMeasures: [],
      enrichmentActivities: [],
      skills: [],
      values: [],
      references: [],
    },

    resources: {
      book: "",
      notes: "",
      ppt: "",
      video: "",
      worksheet: "",
      questionBank: "",
      exemplar: "",
    },
  },
];