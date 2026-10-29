import { useId } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Card from "../../commons/Card";

type ProfileMenuItem = {
  label: string;
  icon: LucideIcon;
  to?: string;
};

type ProfileMenuSectionProps = {
  title: string;
  items: ProfileMenuItem[];
};

const ProfileMenuSection = ({ title, items }: ProfileMenuSectionProps) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-1.75 text-[10px] leading-normal font-semibold tracking-[0.5px] text-sich-label uppercase"
      >
        {title}
      </h2>

      <Card className="overflow-hidden border border-sich-border shadow-none!">
        <ul className="divide-y divide-sich-border">
          {items.map(({ label, icon: Icon, to }) => {
            const content = (
              <>
                <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#fde7f0] text-sich-magenta">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1 text-[13px] leading-normal text-sich-heading">{label}</span>
                <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-sich-label" />
              </>
            );
            const rowClassName = "flex min-h-16 items-center gap-3 px-3.5 py-3.5";

            return (
              <li key={label}>
                {to ? (
                  <Link to={to} className={`${rowClassName} transition-colors hover:bg-sich-magenta/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sich-magenta`}>
                    {content}
                  </Link>
                ) : (
                  <div className={rowClassName}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default ProfileMenuSection;
