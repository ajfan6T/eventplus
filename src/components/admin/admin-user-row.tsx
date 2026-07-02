"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, MapPin, Store, CalendarDays, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteUserAccount } from "@/lib/actions/admin";
import type { AdminUser } from "@/lib/queries";

const roleBadge: Record<string, { label: string; variant: "maroon" | "green" | "gold" | "muted" }> = {
  admin: { label: "Admin", variant: "maroon" },
  vendor: { label: "Vendor", variant: "gold" },
  family: { label: "Family", variant: "green" },
};

export function AdminUserRow({ user, isSelf }: { user: AdminUser; isSelf: boolean }) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const role = roleBadge[user.role] ?? { label: user.role, variant: "muted" };

  async function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    setDeleteError(null);
    const res = await deleteUserAccount(user.id);
    setDeleting(false);
    if (res.ok) {
      setConfirmOpen(false);
      router.refresh();
    } else {
      setDeleteError(res.error ?? "Couldn't delete this account.");
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-serif text-lg font-semibold text-ink">
            {user.name || "Unnamed"}
          </p>
          <Badge variant={role.variant}>{role.label}</Badge>
          {isSelf && <Badge variant="outline">You</Badge>}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{user.email}</span>
          {user.city && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {user.city}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" /> Joined{" "}
            {user.createdAt.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
          </span>
          {user.vendorSlug && (
            <Link
              href={`/vendors/${user.vendorSlug}`}
              className="inline-flex items-center gap-1 font-medium text-maroon-600 hover:underline"
            >
              <Store className="size-3.5" /> {user.vendorName} <ExternalLink className="size-3" />
            </Link>
          )}
          {user.eventCount > 0 && (
            <span>
              {user.eventCount} planning event{user.eventCount === 1 ? "" : "s"}
            </span>
          )}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        <Dialog
          open={confirmOpen}
          onOpenChange={(open) => {
            setConfirmOpen(open);
            if (open) setDeleteError(null);
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isSelf}
              title={isSelf ? "You can't delete your own account" : undefined}
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
            >
              <Trash2 className="size-4" /> Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this account?</DialogTitle>
              <DialogDescription>
                This permanently removes <strong>{user.name || user.email}</strong>
                {user.vendorSlug && " and their vendor listing"}. This can&apos;t be undone.
              </DialogDescription>
            </DialogHeader>
            {deleteError && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {deleteError}
              </p>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm" disabled={deleting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                Delete permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
