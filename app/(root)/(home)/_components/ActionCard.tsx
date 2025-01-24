import { motion } from "framer-motion";
import type { QuickActionType } from "@/lib/constants";
import { Card } from "@/components/ui/card";

export function ActionCard({
  action,
  onClick,
}: {
  action: QuickActionType;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer h-full"
        onClick={onClick}
      >
        {/* Action Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100 group-hover:opacity-50 transition-opacity`}
        />

        {/* Action Content Wrapper */}
        <div className="relative p-6 h-full flex flex-col justify-between">
          <div className="space-y-3">
            {/* Action Icon */}
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}/10`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <action.icon className={`h-6 w-6 text-${action.color}`} />
            </motion.div>

            {/* Action Details */}
            <div className="space-y-1">
              <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          </div>

          <motion.div
            className="mt-4 text-primary font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get Started →
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

