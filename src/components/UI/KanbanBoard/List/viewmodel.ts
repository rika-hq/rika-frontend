import { KanbanList } from "@/models/kanban.interface";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {
	ChangeEvent,
	KeyboardEvent,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";

export interface ListItemProps {
	children?: ReactNode;
	id: UniqueIdentifier;
}

export interface ListProps {
	id: string;
	list: KanbanList;
	onTitleChanged?: (newTitle: string) => void;
	onNewCardAdded?: (title: string) => void;
}

export function useViewModel(props: ListProps) {
	const {
		setNodeRef: setNodeRefList,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: props.id });

	const [title, setTitle] = useState<string>(props.list.title);
	const [newCardTitle, setNewCardTitle] = useState<string>("");
	const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
	const [addCardFieldVisible, setAddCardFieldVisible] =
		useState<boolean>(false);

	const addCardInputRef = useRef<HTMLInputElement | null>(null);
	const titleEditInputRef = useRef<HTMLInputElement | null>(null);
	const { setNodeRef } = useDroppable({ id: props.id });

	const onEditTitle = async () => {
		await setIsEditingTitle(true);
		titleEditInputRef.current?.focus();
	};

	const onEditTitleEnd = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key == "Escape" || event.key == "Enter") {
			setIsEditingTitle(false);
			props.onTitleChanged?.(title);
		}
	};

	const onTitleEditBlur = () => {
		setIsEditingTitle(false);
	};

	const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const onNewCardTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewCardTitle(event.target.value);
	};

	const hideAddItemField = () => {
		setAddCardFieldVisible(false);
	};

	const showAddItemField = async () => {
		await setAddCardFieldVisible(true);
		addCardInputRef.current?.focus({
			preventScroll: false,
		});
	};

	const addNewCard = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			props.onNewCardAdded?.(newCardTitle);
			setAddCardFieldVisible(false);
			setNewCardTitle("");
			return;
		}
	};

	useEffect(() => {
		setTitle(props.list.title);
	}, [props.list]);

	return {
		isEditingTitle,
		addCardInputRef,
		title,
		newCardTitle,
		addCardFieldVisible,
		titleEditInputRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
		setNodeRefList,
		addNewCard,
		setNodeRef,
		showAddItemField,
		hideAddItemField,
		onTitleEditBlur,
		onTitleChange,
		onNewCardTitleChange,
		onEditTitleEnd,
		onEditTitle,
	};
}
