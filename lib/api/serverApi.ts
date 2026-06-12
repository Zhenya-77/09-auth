import { cookies } from "next/headers";
import { fetchNotesProps, GetNotes, ServerBoolResponse } from "./clientApi";
import { NextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

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

export async function fetchNoteServerById(noteId: string) {
  const cookie = await cookies();
  const res = await NextServer.get<Note>(`/notes/${noteId}`, {
    headers: { Cookie: cookie.toString() },
  });
  return res.data;
}

export async function fetchServerNotes({
  page,
  searchQuery,
  tag,
}: fetchNotesProps) {
  const cookie = await cookies();
  const res = await NextServer.get<GetNotes>("/notes", {
    params: {
      page,
      ...(searchQuery && { search: searchQuery }),
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookie.toString(),
    },
  });

  return res.data;
}
