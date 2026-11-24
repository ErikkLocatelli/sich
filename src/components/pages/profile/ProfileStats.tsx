import Card from "../../commons/Card";
import { Skeleton } from "../../ui/skeleton";
import { cn } from "../../../lib/utils";
import type { ProfileStat } from "../../../services/profile/profileStats";
import type { ProfileVariant } from "./profileMenu";

const styles = {
  // Overlaps the bottom of the gradient header
  mobile: { card: "relative mx-5 -mt-9 min-h-16.75 px-3.5 py-3.5", item: "", label: "text-[10px]", value: "text-[14px]" },
  desktop: { card: "p-5.5", item: "gap-0.5", label: "text-[11px]", value: "text-[20px]" },
};

const ProfileStats = ({ stats, variant = "mobile" }: { stats: ProfileStat[]; variant?: ProfileVariant }) => {
  const style = styles[variant];

  return (
    <Card className={cn("border border-sich-border", style.card)}>
      <dl className="grid grid-cols-3 divide-x divide-sich-border">
        {stats.map(({ label, value }) => (
          <div key={label} className={cn("flex min-w-0 flex-col items-center justify-center px-1 text-center", style.item)}>
            <dt className={cn("order-2 leading-normal text-sich-label", style.label)}>{label}</dt>
            <dd className={cn("order-1 leading-normal font-bold text-sich-magenta", style.value)}>
              {value ?? <Skeleton aria-label="Carregando" className="my-0.5 h-4 w-10" />}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export default ProfileStats;
