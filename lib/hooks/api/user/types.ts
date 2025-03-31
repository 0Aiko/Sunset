import { GameMode } from "@/lib/types/GameMode";
import { StatsSnapshot } from "@/lib/types/StatsSnapshot";

export type UserGrades = {
  count_xh: number;
  count_x: number;
  count_sh: number;
  count_s: number;
  count_a: number;
  count_b: number;
  count_c: number;
  count_d: number;
};

export type UserBadge =
  | "admin"
  | "supporter"
  | "bat"
  | "developer"
  | "bot"
  | "champion"
  | "restricted";

export interface User {
  user_id: number;
  username: string;
  description?: string;
  country_code: string;
  register_date: string;
  last_online_time: string;
  restricted: boolean;
  silenced_until?: string;
  user_status: string;
  badges: UserBadge[];
}

export interface UserStats {
  user_id: number;
  gamemode: GameMode;
  accuracy: number;
  total_score: number;
  ranked_score: number;
  play_count: number;
  pp: number;
  max_combo: number;
  play_time: number;
  rank: number;
  country_rank: number;
  best_global_rank: number;
  best_global_rank_date: string;
  best_country_rank: number;
  best_country_rank_date: string;
}

export type UserGraph = {
  snapshots: StatsSnapshot[];
  total_count: number;
};

export type UpdateUserFriendshipAction = "add" | "remove";
