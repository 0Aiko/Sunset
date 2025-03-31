"use client";

import { UserGrades } from "@/lib/hooks/api/user/types";
import { GameMode } from "@/lib/types/GameMode";
import useSWR from "swr";

export function useUserGrades(userId: number, mode: GameMode) {
  return useSWR<UserGrades>(`user/${userId}/grades?mode=${mode}`);
}
