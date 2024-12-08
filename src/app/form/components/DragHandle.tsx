import { GripVertical } from 'lucide-react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface DragHandleProps {
  id: string
}

export function DragHandle({ id }: DragHandleProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="px-0.5 py-2 opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none"
      style={style}
    >
      <GripVertical className="h-4 w-4" />
    </button>
  )
}

