import { Star } from "lucide-react";
import Avatar from "../../commons/Avatar";
import Card from "../../commons/Card";
import { profileDemoData } from "./profileDemoData";

const ProfileFavorites = () => (
  <section aria-labelledby="profile-favorites-heading" className="mt-10">
    <h2 id="profile-favorites-heading" className="mb-3 text-[16px] font-medium text-sich-label">
      Favoritas
    </h2>
    <Card className="border border-sich-border px-5 py-3">
      <ul className="divide-y divide-sich-border">
        {profileDemoData.favorites.map(({ name, specialty, rating, color }) => (
          <li key={name} className="flex min-h-19 items-center gap-3 py-4">
            <div aria-hidden="true" className="shrink-0">
              <Avatar name={name} className={`size-10 rounded-[14px] [&>span]:text-[11px] ${color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-sich-heading">{name}</p>
              <p className="text-[11px] text-sich-label">{specialty}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-amber-500">
              <span className="sr-only">Avaliação {rating.replace(".", ",")} de 5</span>
              <Star aria-hidden="true" className="size-3.5 fill-current" />
              <span aria-hidden="true">{rating}</span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  </section>
);

export default ProfileFavorites;
