"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/lib/hooks/useUserRole";

function DashboardBtn() {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <Link href="/dashboard">
      <Button variant="ghost" size="icon" className="hidden md:flex">
        <SparklesIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dashboard</span>
      </Button>
    </Link>
  );
}

export default DashboardBtn;
