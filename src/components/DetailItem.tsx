import Heading from "./Heading";

type Item = {
  name: string;
  value: string;
};

export default function DetailItem({ name, value }: Item) {
  return (
    <div className="flex gap-1">
      <Heading className="font-semibold">{name}:</Heading>
      <p>{value}</p>
    </div>
  );
}
