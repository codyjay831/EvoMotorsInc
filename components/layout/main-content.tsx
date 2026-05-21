import { cn } from "@/lib/utils";

type MainContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main id="main-content" className={cn("min-h-[50vh]", className)}>
      {children}
    </main>
  );
}
