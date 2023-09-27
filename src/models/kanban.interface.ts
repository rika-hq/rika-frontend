import { ReactNode } from "react";

export interface KanbanList {
	id: string;
	title: string;
	items: KanbanItem[];
}

export interface KanbanItem {
	id: string;
	content: ReactNode;
}
