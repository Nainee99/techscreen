import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);

  const call = useCall();

  if (!call) return null;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call?.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call?.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-1 p-6 flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-semibold mb-1">Camera Preview</h1>
              <p className="text-sm text-muted-foreground">
                Make sure you look good!
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative"
            >
              <div className="absolute inset-0">
                <VideoPreview className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </Card>

          <Card className="md:col-span-1 p-6">
            <div className="h-full flex flex-col">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-1">Meeting Details</h2>
                <p className="text-sm text-muted-foreground break-all">
                  {call.id}
                </p>
              </motion.div>

              <div className="flex-1 flex flex-col justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 mt-8"
                >
                  <ControlItem
                    icon={CameraIcon}
                    title="Camera"
                    status={isCameraDisabled ? "Off" : "On"}
                    checked={!isCameraDisabled}
                    onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
                  />
                  <ControlItem
                    icon={MicIcon}
                    title="Microphone"
                    status={isMicDisabled ? "Off" : "On"}
                    checked={!isMicDisabled}
                    onCheckedChange={(checked) => setIsMicDisabled(!checked)}
                  />
                  <ControlItem
                    icon={SettingsIcon}
                    title="Settings"
                    status="Configure devices"
                    control={<DeviceSettings />}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3 mt-8"
                >
                  <Button className="w-full" size="lg" onClick={handleJoin}>
                    Join Meeting
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Do not worry, our team is super friendly! We want you to
                    succeed. 🎉
                  </p>
                </motion.div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

interface ControlItemProps {
  icon: React.ElementType;
  title: string;
  status: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  control?: React.ReactNode;
}

function ControlItem({
  icon: Icon,
  title,
  status,
  checked,
  onCheckedChange,
  control,
}: ControlItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
      </div>
      {onCheckedChange ? (
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      ) : (
        control
      )}
    </div>
  );
}

export default MeetingSetup;
