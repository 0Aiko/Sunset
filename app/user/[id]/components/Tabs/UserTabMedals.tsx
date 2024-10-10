import PrettyHeader from "@/components/General/PrettyHeader";
import RoundedContent from "@/components/General/RoundedContent";
import { Tooltip } from "@/components/Tooltip";
import { getUserMedals } from "@/lib/actions/getUserMedals";
import { GameMode } from "@/lib/types/GameMode";
import { User } from "@/lib/types/User";
import { UserMedal, UserMedals } from "@/lib/types/UserMedals";
import { LucideMedal } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import PrettyDate from "@/components/General/PrettyDate";
import Spinner from "@/components/Spinner";

interface UserTabMedalsProps {
  user: User;
  gameMode: GameMode;
}

const MEDALS_NAMES: Record<string, string> = {
  hush_hush: "Hush hush",
  beatmap_hunt: "Beatmap hunt",
  mod_introduction: "Mod introduction",
  skill: "Skill",
};

export default function UserTabMedals({ user, gameMode }: UserTabMedalsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [medals, setMedals] = useState<UserMedals | null>(null);

  useEffect(() => {
    if (isLoading) return;

    setIsLoading(true);

    getUserMedals(user.user_id, gameMode).then((data) => {
      if (data.error) {
        setIsLoading(false);
        console.error(data.error);
        return;
      }

      setMedals(data.data!);
      setIsLoading(false);
    });
  }, [gameMode]);

  const medalToElement = (medal: UserMedal) => {
    const isAchieved = medal.unlocked_at !== null;

    return (
      <div className="flex flex-col items-center">
        <Tooltip
          key={medal.id}
          content={
            <div className="flex flex-col items-center text-center min-w-52">
              <h2 className="text-xl font-semibold mx-auto text-wrap mb-2">
                {medal.name}
              </h2>

              <div className="text-sm text-center whitespace-normal max-w-52 mx-auto mb-2 text-gray-200">
                {medal.description}
              </div>

              <p className="text-xs text-gray-300">
                {isAchieved ? (
                  <div className="flex items-center">
                    <p>achieved at&nbsp;</p>
                    <PrettyDate time={medal.unlocked_at!} withTime={false} />
                  </div>
                ) : (
                  `Not achieved`
                )}
              </p>
            </div>
          }
        >
          <Image
            src={`https://a.${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/medals/client/${medal.id}@2x.png`}
            alt={medal.name}
            width={75}
            height={75}
            className={`rounded-full ${
              isAchieved ? "filter-none" : "filter grayscale opacity-50"
            } center`}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <PrettyHeader text="Medals" icon={<LucideMedal />} />

      {/* map each mels */}
      <RoundedContent className="min-h-0 h-fit max-h-none grid grid-cols-2 gap-4">
        {Object.keys(MEDALS_NAMES).map((category) => (
          <div key={category} className="">
            <div className="bg-coffee-600 rounded-lg px-4 py-1 flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold">
                  {MEDALS_NAMES[category]}
                </h2>
              </div>
            </div>
            <div className="p-4 rounded-b-lg grid grid-cols-4 gap-4 justify-center items-center">
              {medals ? (
                medals[category as keyof UserMedals].medals.map((medal) =>
                  medalToElement(medal)
                )
              ) : (
                <div className="mx-auto col-span-4">
                  <Spinner size="lg" />
                </div>
              )}
            </div>
          </div>
        ))}
      </RoundedContent>
    </div>
  );
}
