import { cookies } from "next/headers";
import { ServerBoolResponse } from "./clientApi";
import { NextServer } from "./api";
import { User } from "@/types/user";

export async function checkServerSession() {
  const cookie = await cookies();
  const res = await NextServer<ServerBoolResponse>("/auth/session", {
    headers: { Cookie: cookie.toString() },
  });
  return res;
}

export async function getServerMe() {
  const cookie = await cookies();
  const { data } = await NextServer<User>("/users/me", {
    headers: { Cookie: cookie.toString() },
  });
  return data;
}
