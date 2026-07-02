"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export interface AdminActionResult {
  ok: boolean;
  error?: string;
}

/**
 * Admin-only: permanently delete a user account. Also removes any vendor listing they
 * own (cascading its packages/reviews, detaching CRM leads) and any planning event they
 * own (cascading its checklist tasks/budget lines), so no orphaned data is left behind.
 */
export async function deleteUserAccount(userId: string): Promise<AdminActionResult> {
  const session = await auth();
  if (session?.user?.role !== "admin") return { ok: false, error: "Not authorized." };
  if (session.user.id === userId) {
    return { ok: false, error: "You can't delete your own account." };
  }

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!target) return { ok: false, error: "That account no longer exists." };

  await prisma.$transaction([
    prisma.vendor.deleteMany({ where: { userId } }),
    prisma.event.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/vendors");
  revalidatePath("/");
  return { ok: true };
}
