import { redirect } from "next/navigation";
import { ShieldCheck, LogOut } from "lucide-react";
import { auth } from "@/auth";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { signOutAction } from "@/lib/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/");

  return (
    <div className="min-h-dvh bg-cream-100">
      <header className="border-b border-border/70 bg-cream-50/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <Badge variant="maroon" className="gap-1">
              <ShieldCheck className="size-3" /> Admin
            </Badge>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-200 hover:text-maroon-700"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
        </Container>
      </header>
      <main>
        <Container className="py-10">{children}</Container>
      </main>
    </div>
  );
}
