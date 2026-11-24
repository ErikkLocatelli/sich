import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

import { favoritesQuery } from "../../../api/favorite/favoriteQueries";
import { providerHref } from "../../../services/home/customerHome";
import { providerSubtitle } from "../../../services/search/searchFilters";
import Avatar from "../../commons/Avatar";
import Card from "../../commons/Card";
import FavoriteButton from "../../commons/FavoriteButton";
import { Skeleton } from "../../ui/skeleton";

const FavoritesSkeleton = () => (
  <ul aria-busy="true" aria-label="Carregando favoritas" className="divide-y divide-sich-border">
    {Array.from({ length: 3 }, (_, index) => (
      <li key={index} className="flex min-h-19 items-center gap-3 py-4">
        <Skeleton className="size-10 shrink-0 rounded-[14px]" />
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </li>
    ))}
  </ul>
);

const FavoritesEmpty = () => (
  <div className="flex flex-col items-center gap-1.5 py-6 text-center">
    <Heart aria-hidden="true" className="size-6 text-sich-magenta" />
    <p className="text-[13px] font-medium text-sich-heading">Você ainda não favoritou profissionais</p>
    <Link to="/search" className="text-[11px] font-semibold text-sich-magenta hover:underline">
      Encontrar profissional ›
    </Link>
  </div>
);

const ProfileFavorites = () => {
  const { data: favorites, isPending } = useQuery(favoritesQuery());

  return (
    <section aria-labelledby="profile-favorites-heading" className="mt-10">
      <h2 id="profile-favorites-heading" className="mb-3 text-[16px] font-medium text-sich-label">
        Favoritas
      </h2>
      <Card className="border border-sich-border px-5 py-3">
        {isPending ? (
          <FavoritesSkeleton />
        ) : !favorites?.length ? (
          <FavoritesEmpty />
        ) : (
          <ul className="divide-y divide-sich-border">
            {favorites.map((provider) => (
              <li key={provider.id} className="flex min-h-19 items-center gap-3 py-4">
                <Link
                  to={providerHref(provider.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sich-magenta"
                >
                  <Avatar
                    name={provider.name}
                    url={provider.photo}
                    className="size-10 shrink-0 rounded-[14px] bg-sich-gradient [&>span]:text-[11px]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-sich-heading">{provider.name}</p>
                    <p className="truncate text-[11px] text-sich-label">{providerSubtitle(provider)}</p>
                  </div>
                </Link>
                <FavoriteButton providerId={provider.id} providerName={provider.name} favorite={provider.favorite} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default ProfileFavorites;
