import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanBoardProps, useViewModel } from "./viewmodel";
import { List } from "./List";

export function KanbanBoard(props: KanbanBoardProps) {
	const viewModel = useViewModel(props);

	return (
		<DndContext
			collisionDetection={closestCenter}
			sensors={viewModel.sensors}
			onDragStart={viewModel.onDragStart}
			onDragCancel={viewModel.onDragCancel}
			onDragOver={viewModel.onDragOver}
			onDragEnd={viewModel.onDragEnd}
		>
			<SortableContext
				id="kanban"
				items={viewModel.getLists()}
				strategy={horizontalListSortingStrategy}
			>
				{viewModel.getLists().map((list, index) => (
					<List
						key={index}
						onTitleChanged={(newTitle) =>
							viewModel.setListTitle(list.id, newTitle)
						}
						onNewCardAdded={(title) =>
							viewModel.addNewCard(list.id, title)
						}
						list={list}
						id={list.id}
					/>
				))}
			</SortableContext>
			<DragOverlay>
				{viewModel.draggedItem ? (
					<div className="rotate-3 border-2 border-space-400 bg-space-500 p-2 rounded-lg text-white">
						{viewModel.draggedItem.content}
					</div>
				) : null}
				{viewModel.draggedList ? (
					<div className="rotate-2 bg-space-600 shadow-2xl text-white border-2 border-space-400 w-[350px] h-fit flex flex-col rounded-lg overflow-hidden">
						<div className="mx-4 my-2 text-2xl font-bold">
							{viewModel.draggedList.title}
						</div>
						<hr className="w-[90%] self-center border-space-200" />
						<ul className="flex flex-col gap-3 p-5 overflow-y-auto ">
							{viewModel.draggedList.items.map((item, index) => (
								<li
									key={index}
									className="transition-all duration-500 border-2 border-space-400 bg-space-500 p-2 rounded-lg hover:bg-space-400 hover:border-space-300"
								>
									{item.content}
								</li>
							))}
						</ul>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}
