import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-md pb-24">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
