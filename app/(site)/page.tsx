"use client";
import ServerStatus from "@/app/(site)/components/ServerStatus";
import { useServerStatus } from "@/lib/hooks/api/useServerStatus";

export default function Home() {
  const serverStatusQuery = useServerStatus();
  const serverStatus = serverStatusQuery.data ?? {
    is_online: false,
    users_online: 0,
    total_users: 0,
  };

  return (
    <div>
      {/* Video and gradient */}
      <video
        autoPlay
        muted
        loop
        className="absolute z-[-1] w-full min-h-[700px] max-h-[700px] object-cover top-0 left-0"
        src={`/videos/landing-${Math.floor(Math.random() * 4)}.mp4`}
      />
      <div className="absolute z-5 w-full min-h-[700px] bg-gradient-to-t from-wine to-transparent top-0 left-0" />

      {/* Main content */}
      <div className="relative z-10 w-full min-h-[700px] flex items-center justify-center">
        <h1 className="text-7xl font-bold text-white text-center z-10 max-w-2xl">
          Yet Another <b className="text-pink-500">osu!</b> private server
        </h1>
        <div className="absolute z-10 w-full flex justify-center space-x-4 bottom-4">
          <ServerStatus
            type="server_status"
            data={serverStatus.is_online ? "Online" : "Offline"}
          />
          <ServerStatus type="total_users" data={serverStatus.total_users} />
          <ServerStatus type="users_online" data={serverStatus.users_online} />
        </div>
      </div>

      {/* Features */}
      <div className="w-full pb-12">
        <h2 className="text-4xl font-bold text-white text-center py-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-winecoffee group hover:bg-terracotta-750 hover:scale-105 p-4 rounded-lg smooth-transition">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300">Leaderboards</h3>
            <p className="text-white group-hover:text-gray-300">
              Compete with other players to see who is the best!
            </p>
          </div>
          <div className="bg-winecoffee group hover:bg-terracotta-750 hover:scale-105 p-4 rounded-lg smooth-transition">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300">Multiplayer</h3>
            <p className="text-white group-hover:text-gray-300">
              Play with your friends in real-time multiplayer matches!
            </p>
          </div>
          <div className="bg-winecoffee group hover:bg-terracotta-750 hover:scale-105 p-4 rounded-lg smooth-transition">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300">Customization</h3>
            <p className="text-white group-hover:text-gray-300">
              Customize your profile and gameplay to your liking!
            </p>
          </div>
          <div className="bg-winecoffee group hover:bg-terracotta-750 hover:scale-105 p-4 rounded-lg smooth-transition">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300">Relax, Autopilot and ScoreV2 PP</h3>
            <p className="text-white group-hover:text-gray-300">
              Play with mods that don't give PP on the official server!
            </p>
          </div>
          <div className="bg-winecoffee group hover:bg-terracotta-750 hover:scale-105 p-4 rounded-lg smooth-transition">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300">Free Osu!Direct</h3>
            <p className="text-white group-hover:text-gray-300">
              Download maps in-game and play without any restrictions!
            </p>
          </div>
          <div className="bg-winecoffee group hover:bg-terracotta-750 hover:scale-105 p-4 rounded-lg smooth-transition">
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300">Communication</h3>
            <p className="text-white group-hover:text-gray-300">
              Developers are always in touch with players, we always listen to your opinion!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
