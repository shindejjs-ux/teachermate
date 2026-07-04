const class9mathematics: unknown[] = [];
export function getChapters(
  className: string,
  subject: string
) {
  if (
    className === "Class 9" &&
    subject === "Mathematics"
  ) {
    return class9mathematics;
  }

  return [];
}