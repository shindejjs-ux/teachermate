import Card from "../ui/Card";

interface Props {
  icon: string;
  title: string;
  description: string;
}

export default function QuickActionCard({
  icon,
  title,
  description,
}: Props) {

  return (

    <Card className="cursor-pointer hover:-translate-y-2 duration-300">

      <div className="text-5xl mb-4">

        {icon}

      </div>

      <h2 className="font-bold text-xl">

        {title}

      </h2>

      <p className="text-gray-600 mt-2">

        {description}

      </p>

    </Card>

  );

}