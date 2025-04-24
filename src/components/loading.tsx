// components/ui/loading.tsx
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
    text?: string;
    className?: string;
}

export function Loading({ text = "loading...", className }: LoadingProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground ml-3">{text}</p>
        </div>
    );
}
