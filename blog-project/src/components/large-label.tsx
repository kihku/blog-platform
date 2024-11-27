export default function LargeLabel({ title, subtitle }) {
  return (
    <div>
      <p className="font-bold text-base text-gray-600">{title}</p>
      <p className="font-bold text-gray-400">{subtitle}</p>
    </div>
  );
}
