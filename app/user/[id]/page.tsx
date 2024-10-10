"use client";
import Spinner from "@/components/Spinner";
import { getUser } from "@/lib/actions/getUser";
import { User as UserObj } from "@/lib/types/User";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GameMode } from "@/lib/types/GameMode";
import { UserStats } from "@/lib/types/UserStats";
import { Edit3Icon, Globe, User, UserMinus, UserPlus } from "lucide-react";
import UserBadges from "@/app/user/[id]/components/UserBadges";
import PrettyHeader from "@/components/General/PrettyHeader";
import PrettyButton from "@/components/General/PrettyButton";
import UserTabGeneral from "@/app/user/[id]/components/Tabs/UserTabGeneral";
import UserTabWIP from "@/app/user/[id]/components/Tabs/UserTabWIP";
import { Tooltip } from "@/components/Tooltip";
import useSelf from "@/lib/hooks/useSelf";
import UserTabRecentScores from "@/app/user/[id]/components/Tabs/UserTabRecentScores";
import UserTabTopScores from "@/app/user/[id]/components/Tabs/UserTabTopScores";
import UserTabBestScores from "@/app/user/[id]/components/Tabs/UserTabBestScores";
import SkeletonLoading from "@/components/SkeletonLoading";
import PrettyDate from "@/components/General/PrettyDate";
import { twMerge } from "tailwind-merge";
import { editFriendshipStatus } from "@/lib/actions/editFriendshipStatus";
import { getUserFriendshipStatus } from "@/lib/actions/getUserFriendshipStatus";
import UserTabMedals from "./components/Tabs/UserTabMedals";

const defaultGamemodes = ["osu!std", "osu!taiko", "osu!catch", "osu!mania"];

const contentTabs = [
  "General",
  "Best scores",
  "Recent scores",
  "First places",
  "Medals",
];

export default function UserPage({ params }: { params: { id: number } }) {
  const [user, setUser] = useState<UserObj | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [activeMode, setActiveMode] = useState("osu!std");
  const [friendshipStatus, setFriendshipStatus] = useState<
    "none" | "following" | "mutual"
  >("none");

  const { self } = useSelf();

  const navigateTo = (href: string) => {
    window.location.href = href;
  };

  const activeGameMode =
    GameMode[activeMode.replace("osu!", "") as keyof typeof GameMode];

  const statusColor = (user: UserObj) =>
    user.user_status.trim() === "Offline"
      ? "text-[#b8b8b8]"
      : user.user_status.trim() === "Idle" || user.user_status.trim() === "Afk"
      ? "text-orange-400"
      : "text-green-500";

  useEffect(() => {
    if (!params.id || isLoading) return;

    setIsLoading(true);

    getUser(params.id, activeGameMode).then((user) => {
      if (user.error) {
        setIsLoading(false);
        return;
      }

      setUser(user.data);
      setUserStats(user.stats!);

      fetchFriendshipStatus();

      setIsLoading(false);
    });
  }, [params.id, activeMode, activeGameMode]);

  const updateFriendshipStatus = (action: "add" | "remove") => () => {
    editFriendshipStatus(params.id, action).then((status) => {
      if (status.error) {
        console.error(status.error);
        return;
      }

      fetchFriendshipStatus();
    });
  };

  const fetchFriendshipStatus = () => {
    getUserFriendshipStatus(params.id).then((status) => {
      if (status.error) {
        console.error(status.error);
        return;
      }

      if (status.data?.is_followed && status.data?.is_following) {
        setFriendshipStatus("mutual");
      } else if (status.data?.is_followed) {
        setFriendshipStatus("following");
      } else {
        setFriendshipStatus("none");
      }
    });
  };

  const renderFriendshipButton = () => {
    if (!self) return;

    switch (friendshipStatus) {
      case "following":
        return (
          <PrettyButton
            onClick={updateFriendshipStatus("remove")}
            icon={<UserMinus />}
            className="bg-lime-700 text-white hover:bg-lime-500"
            text="Unfollow"
          />
        );
      case "mutual":
        return (
          <PrettyButton
            onClick={updateFriendshipStatus("remove")}
            icon={<UserMinus />}
            className="bg-pink-700 text-white hover:bg-pink-500"
            text="Unfriend"
          />
        );
      default:
        return (
          <PrettyButton
            onClick={updateFriendshipStatus("add")}
            icon={<UserPlus />}
            text="Follow"
          />
        );
    }
  };

  const renderTabContent = () => {
    if (!user) return null;

    switch (activeTab) {
      case "General":
        return (
          <UserTabGeneral
            key={`general-${activeGameMode}`}
            user={user}
            stats={userStats}
            gameMode={activeGameMode}
          />
        );
      case "Best scores":
        return (
          <UserTabBestScores
            key={`best-${activeGameMode}`}
            gameMode={activeGameMode}
            userId={user.user_id}
          />
        );
      case "Recent scores":
        return (
          <UserTabRecentScores
            key={`recent-${activeGameMode}`}
            gameMode={activeGameMode}
            userId={user.user_id}
          />
        );
      case "First places":
        return (
          <UserTabTopScores
            key={`first-${activeGameMode}`}
            gameMode={activeGameMode}
            userId={user.user_id}
          />
        );
      case "Medals":
        return (
          <UserTabMedals
            key={`medals-${activeGameMode}`}
            user={user}
            gameMode={activeGameMode}
          />
        );
       
      default:
        return <UserTabWIP tabName={activeTab} />;
    }
  };

  if (user === null)
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="container mx-auto my-8">
      {/* Player info header */}

      <PrettyHeader
        icon={<User />}
        text="Player info"
        className="bg-terracotta-700 mb-4"
        roundBottom={true}
      >
        <div className="flex space-x-2">
          {defaultGamemodes.map((mode) => (
            <PrettyButton
              text={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-3 py-1 ${
                activeMode === mode ? "bg-terracotta-400 text-white" : ""
              }`}
            />
          ))}
        </div>
      </PrettyHeader>

      <div className="bg-terracotta-700 rounded-lg">
        {/* Banner */}
        <div className="h-64 relative">
          <Image
            src={`https://a.${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/banner/${user.user_id}?default=false`}
            alt=""
            layout="fill"
            objectFit="cover"
            className="bg-stone-700 rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta-700 to-transparent flex items-end">
            <div className="p-6 flex items-end justify-between w-full">
              <div className="flex items-end space-x-4">
                <div className="relative w-32 h-32">
                  <Image
                    src={`https://a.${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/avatar/${user.user_id}`}
                    alt="User avatar"
                    layout="fill"
                    objectFit="cover"
                    className={`w-32 h-32 rounded-full border-4 relative border-[#2a2a2a]`}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold relative">
                    {user.username}
                  </h1>
                  <p
                    className={twMerge("flex items-center", statusColor(user))}
                  >
                    {user.user_status}
                    {user.user_status === "Offline" && (
                      <>
                        <p>, last seen at&nbsp;</p>
                        <PrettyDate time={user.last_online_time} />
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-2 bg-black bg-opacity-75 px-2 py-1 rounded mr-2">
                <Tooltip content="Highest rank # ?">
                  <div className="flex items-center text-white">
                    <Globe className="w-6 h-6 mr-2" />
                    <span className="text-2xl font-bold items-center flex">
                      #{" "}
                      {userStats?.rank ?? (
                        <SkeletonLoading className="w-9 h-6 ml-2" />
                      )}
                    </span>
                  </div>
                </Tooltip>

                <Tooltip content="Highest rank # ?">
                  <div className="flex items-center text-white">
                    <img
                      src={`/images/flags/${user.country_code}.png`}
                      alt="Russian Flag"
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-2xl font-bold"># ?</span>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex justify-between items-start mb-1">
            <div className="flex flex-wrap gap-2">
              <UserBadges badges={user.badges} />
            </div>
            <div className="flex space-x-2">
              {user.user_id === self?.user_id ? (
                <PrettyButton
                  onClick={navigateTo.bind(null, `/settings`)}
                  icon={<Edit3Icon />}
                  text="Edit profile"
                />
              ) : (
                <>
                  {renderFriendshipButton()}
                  {/* TODO: <PrettyButton onClick={() => {}} icon={<MessageSquare />} /> */}
                </>
              )}
            </div>
          </div>

          {/* Tab selector */}
          <div className="mb-6">
            <div className="flex border-b border-gray-700">
              {contentTabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 border-[#E0C097] ${
                    activeTab === tab
                      ? "text-[#E0C097] border-b-2"
                      : "text-gray-400 hover:text-[#E0C097] hover:border-b-2"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </main>
  );
}
