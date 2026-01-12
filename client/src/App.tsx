import { useEffect, useState } from "react";
import { journalService, type JournalEntry } from "./services/journalService";
import JournalForm from "./components/JournalForm";
import { Trash2, Edit2 } from "lucide-react";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");

    const fetchEntries = async () => {
        try {
            const response = await journalService.getAll();
            setEntries(response);
            setLoading(false);
        } catch (error) {
            setError((error as Error).message);
            setLoading(false);
        }
    };

    const handleEdit = async (id: string) => {
        try {
            const entry = entries.find((entry) => entry.id === id);
            if (entry) {
                setEditingId(id);
                setContent(entry.content);
                setMood(entry.mood);
            }
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setContent("");
        setMood("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (editingId) {
                await journalService.update(editingId, content, mood);

                setEntries((entries) =>
                    entries.map((entry) =>
                        entry.id === editingId
                            ? { ...entry, content, mood }
                            : entry
                    )
                );

                setEditingId(null);
            } else {
                const newEntry = await journalService.create(content, mood);
                setEntries((entries) => [...entries, newEntry]);
            }

            setContent("");
            setMood("");
        } catch (error) {
            console.error(error);
            setError((error as Error).message);
            alert((error as Error).message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }

        try {
            await journalService.delete(id);
            setEntries((entries) => entries.filter((entry) => entry.id !== id));
        } catch (error) {
            setError((error as Error).message);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold m-4">Journal Entries</h1>
            <JournalForm
                content={content}
                setContent={setContent}
                mood={mood}
                setMood={setMood}
                onSubmit={handleSubmit}
                isEditing={!!editingId}
                onCancelEdit={handleCancelEdit}
            />
            <div className="flex flex-wrap gap-4">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        className="flex items-start justify-between gap-4 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3"
                    >
                        {/* Left side: text */}
                        <div className="space-y-1 text-slate-800">
                            <p className="text-sm font-medium">
                                Content:{" "}
                                <span className="font-normal">
                                    {entry.content}
                                </span>
                            </p>
                            <p className="text-sm font-medium">
                                Mood:{" "}
                                <span className="font-normal">
                                    {entry.mood}
                                </span>
                            </p>
                        </div>

                        {/* Right side: icon buttons */}
                        <div className="flex items-center gap-2 text-slate-700">
                            <button
                                onClick={() =>
                                    handleDelete(entry.id)
                                }
                                className="rounded-md p-1.5 hover:bg-slate-200 cursor-pointer"
                                aria-label="Delete entry"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </button>
                            <button
                                onClick={() => handleEdit(entry.id)}
                                className="rounded-md p-1.5 hover:bg-slate-200 cursor-pointer"
                                aria-label="Edit entry"
                            >
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
