import {
  FileText,
  BookOpen,
  ClipboardList,
  Presentation,
  Video,
  Download,
  HelpCircle,
  FileSpreadsheet,
  FlaskConical,
  ImageIcon,
} from "lucide-react";

type Props = {
  type: string;
  className?: string;
};

export default function ResourceIcon({
  type,
  className = "h-10 w-10",
}: Props) {
  const value = type.toLowerCase();

  switch (value) {
    case "textbook":
    case "pdf":
      return <BookOpen className={className} />;

    case "notes":
      return <FileText className={className} />;

    case "worksheet":
      return <ClipboardList className={className} />;

    case "ppt":
    case "presentation":
      return <Presentation className={className} />;

    case "video":
      return <Video className={className} />;

    case "question_bank":
    case "question bank":
      return <HelpCircle className={className} />;

    case "sample_paper":
    case "sample paper":
      return <FileSpreadsheet className={className} />;

    case "lab_manual":
    case "lab manual":
      return <FlaskConical className={className} />;

    case "image":
      return <ImageIcon className={className} />;

    case "download":
      return <Download className={className} />;

    default:
      return <FileText className={className} />;
  }
}