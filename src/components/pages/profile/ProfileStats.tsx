import Card from "../../commons/Card";
import { profileDemoData } from "./profileDemoData";

const ProfileStats = () => {
  const stats = [
    { label: "Atendimentos", value: profileDemoData.appointments },
    { label: "Cashback", value: profileDemoData.cashback },
    { label: "Fidelidade", value: profileDemoData.loyalty },
  ];

  return (
    <Card className="relative mx-5 -mt-9 min-h-16.75 border border-sich-border px-3.5 py-3.5">
      <dl className="grid grid-cols-3 divide-x divide-sich-border">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="flex min-w-0 flex-col items-center justify-center text-center"
          >
            <dt className="order-2 text-[10px] leading-normal text-sich-label">
              {label}
            </dt>
            <dd className="order-1 text-[14px] leading-normal font-bold text-sich-magenta">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export default ProfileStats;
