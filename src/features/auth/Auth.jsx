import { CircleCheck } from "lucide-react";

export default function Auth() {
    return (
        <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
            <div className="relative z-10 max-w-lg">
                <h1 className="text-4xl mb-6">Organize your work, achieve your goals</h1>
                <p className="text-lg text-white/90 mb-8">A beautiful, modern task management app designed for productivity and focus.</p>
                <div className="space-y-4">
                    <Item text={'Intuitive drag-and-drop interface'} />
                    <Item text={'Real-time collaboration'} />
                    <Item text={'Priority management'} />
                    <Item text={'Dark mode support'} />
                </div>
            </div>
        </div>
    )
}
function Item({ text }) {
    return (
        <div className="flex items-center gap-3">
            <CircleCheck className="w-5 h-5 shrink-0" />
            <span>{text}</span>
        </div>
    )
}