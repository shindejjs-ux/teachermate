import QuickActionCard from "./QuickActionCard";

export default function QuickActions() {

  const actions = [

    {
      icon: "📝",
      title: "Lesson Planner",
      description: "Generate AI lesson plans",
    },

    {
      icon: "📚",
      title: "Digital Library",
      description: "Books, Notes, PPT",
    },

    {
      icon: "❓",
      title: "Question Bank",
      description: "Competency Questions",
    },

    {
      icon: "📄",
      title: "Worksheets",
      description: "Printable Worksheets",
    },

    {
      icon: "📊",
      title: "Question Papers",
      description: "CBSE Paper Generator",
    },

    {
      icon: "🤖",
      title: "Teacher AI",
      description: "Ask Anything",
    },

  ];

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

      {actions.map((item) => (

        <QuickActionCard
          key={item.title}
          {...item}
        />

      ))}

    </div>

  );

}