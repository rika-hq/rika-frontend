import { KanbanItem, KanbanList } from "@/models/kanban.interface";
import {
	DragOverEvent,
	DragStartEvent,
	MouseSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

export interface KanbanBoardProps {
	lists?: KanbanList[];
	onChange?: (lists: KanbanList[]) => void;
}

export function useViewModel(props: KanbanBoardProps) {
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const sensors = useSensors(mouseSensor, pointerSensor);
	const [lists, setListsState] = useState<KanbanList[]>(props.lists ?? []);
	const [draggedItem, setDraggedItem] = useState<KanbanItem | null>(null);
	const [draggedList, setDraggedList] = useState<KanbanList | null>(null);

	const getLists = (): KanbanList[] => {
		if (props.lists) {
			return props.lists;
		}
		return lists;
	};

	const setLists = async (newList: KanbanList[]) => {
		if (!props.lists) {
			await setListsState(newList);
		}
		props.onChange?.(newList);
	};

	const findParentList = (
		kanbanLists: KanbanList[],
		itemId?: string
	): KanbanList | undefined => {
		if (!itemId) return;
		for (const list of kanbanLists) {
			if (list.id == itemId) return list;
			for (const item of list.items) {
				if (item.id == itemId) {
					return list;
				}
			}
		}
	};

	const findDragItem = (
		kanbanLists: KanbanList[],
		id?: string
	): KanbanList | KanbanItem | undefined => {
		if (!id) return;
		for (const list of kanbanLists) {
			if (id == list.id) return list;
			for (const item of list.items) {
				if (item.id == id) {
					return item;
				}
			}
		}
	};

	const onDragCancel = () => {
		setDraggedItem(null);
		setDraggedList(null);
	};

	const onDragStart = ({ active }: DragStartEvent) => {
		let item = findDragItem(getLists(), active.id.toString());
		if (item) {
			if ("items" in item) {
				setDraggedList(item);
			} else {
				setDraggedItem(item);
			}
		}
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		let newLists = [...getLists()];
		const dragType = findDragItem(newLists, active.id.toString());

		if (dragType) {
			if ("items" in dragType) {
				const element = Object.assign(
					{},
					newLists.find((list) => list.id == active.id.toString())
				);
				let toIndex = newLists.findIndex(
					(list) => list.id == over?.id.toString()
				);

				if (toIndex == -1) {
					const parent = findParentList(
						newLists,
						over?.id.toString()
					);
					toIndex = newLists.findIndex(
						(list) => list.id == parent?.id
					);
				}

				if (element && toIndex > -1) {
					newLists = newLists.filter(
						(list) => list.id != active.id.toString()
					);
					newLists.splice(toIndex, 0, element);
					console.log(newLists);
				}
			} else {
				const fromContainer = findParentList(
					newLists,
					active.id.toString()
				);
				const toContainer = findParentList(
					newLists,
					over?.id.toString()
				);

				if (!fromContainer || !toContainer) return;

				const fromIndex = fromContainer.items.findIndex(
					(item) => item.id == active.id
				);

				const toIndex = toContainer.items.findIndex(
					(item) => item.id === over?.id
				);

				const element = fromContainer.items[fromIndex];
				fromContainer.items = fromContainer.items.filter(
					(item) => item.id != active.id
				);

				toContainer.items.splice(toIndex, 0, element);
			}
			console.log(newLists);
			setLists(newLists);
		}
	};

	const onDragEnd = () => {
		setDraggedItem(null);
		setDraggedList(null);
	};

	const setListTitle = (id: string, newTitle: string) => {
		const newList = [...getLists()];
		const list = newList.find((l) => l.id == id);

		if (list) {
			list.title = newTitle;
		}

		setLists(newList);
	};

	const addNewCard = (id: string, title: string) => {
		const newList = [...getLists()];
		const list = newList.find((l) => l.id == id);
		if (list) {
			list.items.push({
				content: title,
				id: `${id}_${list.items.length + 1}`,
			});
		}
		setLists(newList);
	};

	return {
		sensors,
		draggedItem,
		draggedList,
		getLists,
		addNewCard,
		setListTitle,
		onDragCancel,
		onDragStart,
		onDragOver,
		onDragEnd,
	};
}
