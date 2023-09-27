import { KanbanList } from "@/models/kanban.interface";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

export function useViewModel() {
	const [lists, setLists] = useState<KanbanList[]>([]);
	const [newListTitle, setNewListTitle] = useState<string>("");
	const [addListMenuVisible, setAddListMenuVisible] =
		useState<boolean>(false);

	const newListTitleInputRef = useRef<HTMLInputElement>(null);

	const onBoardChanged = (newLists: KanbanList[]) => {
		setLists(newLists);
	};

	const hideAddListMenu = () => {
		setAddListMenuVisible(false);
		setNewListTitle("");
	};

	const showAddListMenu = async () => {
		await setAddListMenuVisible(true);
		newListTitleInputRef.current?.focus();
	};

	const onNewCardTitleInputKeyDown = (
		event: KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key == "Enter") {
			addNewList();
		} else if (event.key == "Escape") {
			hideAddListMenu();
		}
	};

	const addNewList = () => {
		const title = newListTitle;
		if (title == "") return;
		setLists((old) => {
			const newList = [...old];
			newList.push({
				id: `${newList.length + 1}_list_${title}`,
				items: [],
				title,
			});

			hideAddListMenu();
			return newList;
		});
	};

	const onNewListTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewListTitle(event.target.value);
	};

	return {
		lists,
		newListTitleInputRef,
		addListMenuVisible,
		newListTitle,
		onNewCardTitleInputKeyDown,
		onNewListTitleChange,
		addNewList,
		showAddListMenu,
		onBoardChanged,
		hideAddListMenu,
	};
}
