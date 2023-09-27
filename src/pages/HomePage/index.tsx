import { KanbanBoard } from "@/components/UI";
import { useViewModel } from "./viewmodel";
import { Icon } from "@iconify/react/dist/iconify.js";

export function HomePage() {
	const viewModel = useViewModel();

	return (
		<div className="w-screen h-screen flex gap-2 p-10 overflow-x-auto">
			<KanbanBoard
				lists={viewModel.lists}
				onChange={viewModel.onBoardChanged}
			/>
			<div className="bg-space-600 shadow-2xl text-white border-2 border-space-400 w-[350px] h-fit flex flex-col rounded-lg overflow-hidden gap-3 p-5">
				{viewModel.addListMenuVisible && (
					<input
						ref={viewModel.newListTitleInputRef}
						className="w-full p-3 bg-space-300 rounded-lg outline-none focus:outline-space-200"
						value={viewModel.newListTitle}
						onChange={viewModel.onNewListTitleChange}
						onKeyDown={viewModel.onNewCardTitleInputKeyDown}
						placeholder="Enter title of the new list"
					/>
				)}
				<div className="w-full flex justify-between items-center gap-2">
					<button
						onClick={
							viewModel.addListMenuVisible
								? viewModel.addNewList
								: viewModel.showAddListMenu
						}
						className="h-[50px] text-xl w-full"
					>
						Add another list
					</button>
					{viewModel.addListMenuVisible && (
						<button
							onClick={viewModel.hideAddListMenu}
							className="transition-all duration-500 w-fit h-fit text-xl text-gray-700 rounded-full p-2 hover:cursor-pointer hover:text-gray-500"
						>
							<Icon fontSize="24px" icon="mdi:cancel-bold" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
