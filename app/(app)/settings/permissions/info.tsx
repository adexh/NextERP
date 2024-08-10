import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from 'lucide-react';

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Info />
      </DialogTrigger>
      <DialogContent className="sm:max-w-3/4">
        <DialogHeader>
          <DialogTitle>Module Permissions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Permissions are assigned based on the role, such as Admin, Employee, etc. They follow a hierarchical structure with three levels: <strong> Main Modules, Modules, and Sub-modules.</strong></p>
          <ul className="list-disc mt-4">
            <li className="ml-6">Main Modules: These are the top-level sections.</li>
            <li className="ml-6">Modules: Subsections within Main Modules.</li>
            <li className="ml-6">Sub-modules: These can be specific actions like API calls or full pages.</li>
          </ul>
          <p>If you don&apos;t have permission for a specific action, like &quot;Add Project,&quot; you won&apos;t be able to access the page or use the related API.</p>
          <p><strong>Parent-child Relationship: </strong>If a parent module is disabled, all its child modules will be disabled as well.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
