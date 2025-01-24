"use client";

import Link from "next/link";
import { CodeIcon, Menu, Search } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import DashboardBtn from "./DashboardBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 ml-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">TechScreen</span>
          </Link>
          <div className="flex items-center space-x-1">
            <Link href="/features">
              <Button variant="ghost" className="text-sm font-medium">
                Features
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-sm font-medium">
                Pricing
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="ghost" className="text-sm font-medium">
                Docs
              </Button>
            </Link>
          </div>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <CodeIcon className="mr-2 h-4 w-4" />
              <span className="font-bold">TechScreen</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <MobileLink href="/features" onOpenChange={setIsOpen}>
                  Features
                </MobileLink>
                <MobileLink href="/pricing" onOpenChange={setIsOpen}>
                  Pricing
                </MobileLink>
                <MobileLink href="/docs" onOpenChange={setIsOpen}>
                  Docs
                </MobileLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          <SignedIn>
            <nav className="flex items-center space-x-2">
              <DashboardBtn />
              <ModeToggle />
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </nav>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
