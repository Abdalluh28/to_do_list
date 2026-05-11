import { Inbox } from "lucide-react";

export default function EmptyLists() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-600/10 flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 class="text-lg font-semibold mb-2">No tasks yet</h3>
            <p class="text-sm text-muted-foreground text-center max-w-sm">Get started by creating your first task. Click the "New Task" button to begin.</p>
        </div>
    )
}
