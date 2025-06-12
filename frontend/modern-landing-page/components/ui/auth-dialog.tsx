import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function AuthDialog({
  isOpen,
  onClose,
  title = "Login Required",
  description = "Please log in to your account to continue shopping.",
}: AuthDialogProps) {
  const router = useRouter()

  const handleLogin = () => {
    onClose()
    router.push("/login")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleLogin}>
            Login Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 