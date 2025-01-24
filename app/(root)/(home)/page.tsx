"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { Loader2Icon, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../../../convex/_generated/api";
// import { useUserRole } from "@/hooks/useUserRole"
import { useUserRole } from "@/lib/hooks/useUserRole";
import { ActionCard } from "./_components/ActionCard";
import { MeetingCard } from "./_components/MeetingCard";
import { MeetingModal } from "./_components/MeetingModal";
import { LoaderUI } from "@/components/custom/LoaderUI";
import { QUICK_ACTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto p-6 space-y-10"
    >
      {/* Welcome Section */}
      <section className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-8 border shadow-lg">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </section>

      {isInterviewer ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </section>
      ) : (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Your Interviews</h2>
              <p className="text-muted-foreground mt-1">
                View and join your scheduled interviews
              </p>
            </div>
            <Button onClick={() => router.push("/interviews")}>
              View All <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {interviews === undefined ? (
            <div className="flex justify-center py-12">
              <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : interviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interviews.slice(0, 3).map((interview) => (
                <MeetingCard key={interview._id} interview={interview} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-muted rounded-lg">
              <p className="text-lg font-medium">
                You have no scheduled interviews at the moment
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/interviews")}
              >
                Browse Available Interviews
              </Button>
            </div>
          )}
        </section>
      )}
    </motion.div>
  );
}
