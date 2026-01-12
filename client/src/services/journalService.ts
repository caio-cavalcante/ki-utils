export interface JournalEntry {
    id: string;
    content: string;
    mood: string;
    createdAt: string;
}

const API_URL = "http://localhost:3333/journal";

export const journalService = {
    getAll: async (): Promise<JournalEntry[]> => {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch journal entries");
        }

        return await response.json();
    },

    create: async (content: string, mood: string): Promise<JournalEntry> => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, mood }),
        });

        if (!response.ok) {
            throw new Error("Failed to create journal entry");
        }

        return await response.json();
    },

    delete: async (id: string) => {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete journal entry");
    },

    update: async (id: string, content: string, mood: string) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, mood }),
        });

        if (!response.ok) throw new Error("Failed to update journal entry");

        return response.json();
    },
};
