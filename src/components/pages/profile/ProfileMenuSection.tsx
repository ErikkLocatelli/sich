import { useId } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";

import Card from "../../commons/Card";
import { cn } from "../../../lib/utils";
import { profileCardTitleClass, type ProfileVariant } from "./profileMenu";

type ProfileMenuItem = {
  label: string;
  description?: string;
  icon: LucideIcon;
  to?: string;
};

type ProfileMenuSectionProps = {
  title: string;
  items: ProfileMenuItem[];
  variant?: ProfileVariant;
};

const styles = {
  mobile: {
    card: "overflow-hidden shadow-none!",
    row: "min-h-16 gap-3 px-3.5 py-3.5",
    link: "hover:bg-sich-magenta/5",
    iconBox: "size-9 rounded-[10px]",
    label: "text-[13px]",
  },
  desktop: {
    card: "p-5.5",
    row: "gap-3.5 rounded-[12px] px-2 py-3.75",
    link: "-mx-2 hover:bg-sich-magenta/5",
    iconBox: "size-10.5 rounded-[14px]",
    label: "text-[14px]",
  },
};

const ProfileMenuSection = ({ title, items, variant = "mobile" }: ProfileMenuSectionProps) => {
  const headingId = useId();
  const style = styles[variant];
  const isDesktop = variant === "desktop";

  const heading = (
    <h2
      id={headingId}
      className={isDesktop ? profileCardTitleClass : "mb-1.75 text-[10px] leading-normal font-semibold tracking-[0.5px] text-sich-label uppercase"}
    >
      {title}
    </h2>
  );

  return (
    <section aria-labelledby={headingId}>
      {!isDesktop && heading}

      <Card className={cn("border border-sich-border", style.card)}>
        {isDesktop && heading}
        <ul className="divide-y divide-sich-border">
          {items.map(({ label, description, icon: Icon, to }) => {
            const content = (
              <>
                <span aria-hidden="true" className={cn("flex shrink-0 items-center justify-center bg-[#fde7f0] text-sich-magenta", style.iconBox)}>
                  <Icon className="size-4" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className={cn("leading-normal text-sich-heading", style.label)}>{label}</span>
                  {description && <span className="text-[11px] leading-normal text-sich-label">{description}</span>}
                </span>
                <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-sich-label" />
              </>
            );
            const rowClassName = cn("flex items-center", style.row);

            return (
              <li key={label}>
                {to ? (
                  <Link
                    to={to}
                    className={cn(rowClassName, style.link, "transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sich-magenta")}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className={cn(rowClassName, isDesktop && "-mx-2")}>{content}</div>
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
