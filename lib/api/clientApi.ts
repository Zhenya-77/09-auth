import { NewNoteData, Note } from "@/types/note";
import { NextServer } from "../api";
import { User } from "@/types/user";

export interface GetNotes {
  notes: Note[];
  totalPages: number;
}

interface fetchNotesProps {
  page?: number;
  searchQuery?: string;
  tag?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ServerBoolResponse {
  success: boolean;
}

export interface UpdateUser {
  username: string;
  email?: string;
}

export async function fetchNotes({ page, searchQuery, tag }: fetchNotesProps) {
  const res = await NextServer.get<GetNotes>("/notes", {
    params: {
      page,
      ...(searchQuery && { search: searchQuery }),
      perPage: 12,
      tag,
    },
  });

  return res.data;
}

export async function createNote(noteData: NewNoteData) {
  const res = await NextServer.post<Note>("/notes", noteData);
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await NextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
}

export async function fetchNoteById(noteId: string) {
  const res = await NextServer.get<Note>(`/notes/${noteId}`);
  return res.data;
}

export async function register(payload: RegisterRequest) {
  const res = await NextServer.post<User>("/auth/register", payload);
  return res.data;
}

export async function login(payload: LoginRequest) {
  const res = await NextServer.post<User>("/auth/login", payload);
  return res.data;
}

export async function checkSession() {
  const res = await NextServer<ServerBoolResponse>("/auth/session");
  return res.data.success;
}

export async function getMe() {
  const res = await NextServer<User>("/users/me");
  return res.data;
}

export async function logOut() {
  const res = await NextServer.post<ServerBoolResponse>("/auth/logout");
  return res.data;
}

export async function updateMe(payload: UpdateUser) {
  const res = await NextServer.patch<User>("/users/me", payload);
  return res.data;
}
