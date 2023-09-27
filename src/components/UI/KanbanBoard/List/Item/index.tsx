import { ListItemProps } from "@/components/UI/KanbanBoard/List/viewmodel";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props: ListItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: props.id });

	return (
		<li
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className="transition-all duration-500 border-2 border-space-400 bg-space-500 p-2 rounded-lg hover:bg-space-400 hover:border-space-300"
			style={{
				opacity: isDragging ? 0.4 : undefined,
				transform: CSS.Translate.toString(transform),
				transition,
			}}
		>
			{props.children}
		</li>
	);
}
