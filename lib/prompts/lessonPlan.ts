export function lessonPlanPrompt({
  className,
  subject,
  chapter,
  duration,
  language,
}: {
  className: string;
  subject: string;
  chapter: string;
  duration: string;
  language: string;
}) {
  return `
You are an expert CBSE teacher.

Generate a professional CBSE lesson plan.

Class : ${className}

Subject : ${subject}

Chapter : ${chapter}

Duration : ${duration}

Language : ${language}

The lesson plan must include:

1. Learning Outcomes
2. Competencies
3. Prerequisite Knowledge
4. Teaching Aids
5. Introduction
6. Classroom Activity
7. Explanation
8. Real Life Application
9. Assessment
10. Homework
11. Reflection
12. Bloom's Taxonomy
13. NEP 2020 Alignment
14. STEM Integration
15. AI Integration
16. Cross Curricular Links

Return well-formatted Markdown.
`;
}