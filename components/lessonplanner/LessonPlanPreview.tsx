interface LessonPlanPreviewProps {
  className: string;
  subject: string;
  chapter: string;
  duration: string;
  lessonType: string;
  teacherName: string;
  schoolName: string;
  session: string;
  showLessonPlan?: boolean;
}

export default function LessonPlanPreview({
  className,
  subject,
  chapter,
  duration,
  lessonType,
  teacherName,
  schoolName,
  session,
  showLessonPlan = true,
}: LessonPlanPreviewProps) {
  return (
    <>
      {showLessonPlan && (
        <div className={className}>
          <h3>{subject} - {chapter}</h3>
          <p>Duration: {duration}</p>
          <p>Lesson Type: {lessonType}</p>
          <p>Teacher: {teacherName}</p>
          <p>School: {schoolName}</p>
          <p>Session: {session}</p>
        </div>
      )}
    </>
  );
}