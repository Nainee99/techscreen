"use client";

import { useEffect } from "react";
import { useUserRole } from "@/lib/hooks/useUserRole";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "./_components/InterviewScheduleUI";
import { LoaderUI } from "@/components/custom/LoaderUI";

function SchedulePage() {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();

  useEffect(() => {
    if (!isLoading && !isInterviewer) {
      router.push("/");
    }
  }, [isInterviewer, isLoading, router]);

  if (isLoading) return <LoaderUI />;
  if (!isInterviewer) return null;

  return <InterviewScheduleUI />;
}

export default SchedulePage;
