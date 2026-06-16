"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signOut } from "@/auth";

const ROLES = ["family", "vendor", "admin"] as const;

export interface RegisterResult {
  ok: boolean;
  error?: string;
}

/** Create a new account (email/password). Returns a serializable result. */
export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  role: string;
  city?: string;
}): Promise<RegisterResult> {
  const name = input.name?.trim();
  const email = input.email?.toLowerCase().trim();
  const password = input.password ?? "";
  const role = (ROLES as readonly string[]).includes(input.role) ? input.role : "family";

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (password.length < 6)
    return { ok: false, error: "Password must be at least 6 characters." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "An account with this email already exists." };

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash, role, city: input.city?.trim() || null },
  });

  return { ok: true };
}

/** Sign out and return home. Used as a <form action={...}>. */
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
