import { cn } from "@/lib/utils";

type MainContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main className={cn("min-h-[50vh] flex-1", className)}>
      {children}
    </main>
  );
}
