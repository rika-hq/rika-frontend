import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { Item } from "./Item";
import { ListProps, useViewModel } from "./viewmodel";

export function List(props: ListProps) {
	const viewModel = useViewModel(props);

	return (
		<SortableContext
			id={props.id}
			items={props.list.items}
			strategy={verticalListSortingStrategy}
		>
			<div
				{...viewModel.attributes}
				{...viewModel.listeners}
				ref={viewModel.setNodeRefList}
				style={{
					opacity: viewModel.isDragging ? 0.4 : undefined,
					transform: CSS.Translate.toString(viewModel.transform),
					transition: viewModel.transition,
				}}
				className="bg-space-600 shadow-2xl text-white border-2 border-space-400 w-[350px] h-fit flex flex-col rounded-lg overflow-hidden"
			>
				{viewModel.isEditingTitle ? (
					<input
						ref={viewModel.titleEditInputRef}
						className="bg-space-400 mx-4 my-3 p-1 text-xl font-bold rounded-lg transition-all duration-500 outline-none focus:outline-space-200"
						value={viewModel.title}
						onChange={viewModel.onTitleChange}
						onBlur={viewModel.onTitleEditBlur}
						onKeyDown={viewModel.onEditTitleEnd}
					/>
				) : (
					<div
						onDoubleClick={viewModel.onEditTitle}
						className="mx-4 my-2 text-2xl font-bold hover:cursor-pointer"
					>
						{props.list.title}
					</div>
				)}

				<hr className="w-[90%] self-center border-space-200" />
				<ul
					ref={viewModel.setNodeRef}
					className="flex flex-col gap-3 p-5 overflow-y-auto "
				>
					{props.list.items.map((item, index) => (
						<Item key={index} id={item.id}>
							{item.content}
						</Item>
					))}
					{viewModel.addCardFieldVisible ? (
						<li>
							<input
								ref={viewModel.addCardInputRef}
								className="w-full p-3 bg-space-300 rounded-lg outline-none focus:outline-space-200"
								value={viewModel.newCardTitle}
								placeholder="Enter a title for new card"
								onKeyDown={viewModel.addNewCard}
								onBlur={viewModel.hideAddItemField}
								onChange={viewModel.onNewCardTitleChange}
							/>
						</li>
					) : null}
					<li
						onClick={viewModel.showAddItemField}
						className="flex items-center gap-3 w-full rounded-md p-3 hover:cursor-pointer hover:bg-space-300"
					>
						<Icon
							className="transition-all duration-500"
							fontSize="25px"
							icon="material-symbols:add"
						/>
						Add new card
					</li>
				</ul>
			</div>
		</SortableContext>
	);
}

List.Item = Item;
