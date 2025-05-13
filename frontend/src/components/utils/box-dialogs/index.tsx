import { CircleCheckBig, CircleX, MessageCircleQuestion } from "lucide-react";
import { cn } from "../../../lib/cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../shared/dialog";
import { LoadingCircle } from "../loading/circle";

interface BoxDialogsProps {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  variant: "success" | "error" | "question" | "loading";
  children?: React.ReactNode;
}

export function BoxDialogs({
  title,
  description,
  open,
  setOpen,
  variant,
  children,
}: BoxDialogsProps) {
  const currentVariant = {
    success: {
      border: "border-green-500",
      text: "text-green-500",
    },
    error: {
      border: "border-red-500",
      text: "text-red-500",
    },
    question: {
      border: "border-blue-500",
      text: "text-blue-500",
    },
    loading: {
      border: "border-orange-500",
      text: "text-orange-500",
    },
  }[variant];

  return (
    <Dialog onOpenChange={(isOpen) => setOpen(isOpen)} open={open}>
      <DialogContent className={cn("border-2 bg-white", currentVariant.border)}>
        <DialogHeader className="flex flex-col items-center">
          {variant === "success" && (
            <CircleCheckBig className={cn(currentVariant.text)} size={50} />
          )}
          {variant === "error" && (
            <CircleX className={cn(currentVariant.text)} size={50} />
          )}
          {variant === "question" && (
            <MessageCircleQuestion
              className={cn(currentVariant.text)}
              size={50}
            />
          )}
          {variant === "loading" && <LoadingCircle />}
          <DialogTitle className={cn(currentVariant.text, "text-xl")}>
            {title}
          </DialogTitle>
        </DialogHeader>
        {description && (
          <DialogDescription className="text-lg flex justify-center text-center text-gray-500">
            {description}
          </DialogDescription>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
