type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: Props) {
  return (
    <select
      {...props}
      className="border rounded-lg p-3 w-full"
    />
  );
}