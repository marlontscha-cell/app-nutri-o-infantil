import { createFileRoute, redirect } from "@tanstack/react-router";
import { readProfile } from "@/hooks/use-baby-profile";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const profile = readProfile();
    throw redirect({ to: profile ? "/home" : "/onboarding" });
  },
  component: () => null,
});
