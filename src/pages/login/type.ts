import type { User } from "@/stores/useApp";

export interface ApiLoginReq {
  username: string;
  password: string;
}

export interface ApiLoginRes {
  token: string;
  user: User;
}

export interface ApiLogoutRes {
  success: boolean;
}

export interface ApiGetPermissionsRes {
  permissions: string[];
}
