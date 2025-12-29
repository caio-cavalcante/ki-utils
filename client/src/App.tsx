import { useEffect, useState } from "react";
import { journalService, type JournalEntry } from "./services/journalService";
import JournalForm from "./JournalForm";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [entries, setEntries] = useState<JournalEntry[]>([]);

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

    useEffect(() => {
        fetchEntries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="mx-auto">
            <h1 className="text-3xl font-bold m-4">Journal Entries</h1>
            <JournalForm onEntryCreated={fetchEntries} />
            <div className="flex flex-wrap">
                {Object.entries(
                    entries.reduce(
                        (acc, entry) => {
                            const date = entry.createdAt.slice(0, 10);
                            acc[date] = acc[date] || [];
                            acc[date].push(entry);
                            return acc;
                        },
                        {} as Record<string, JournalEntry[]>
                    )
                ).map(([date, entries]) => (
                    <div key={date} className="p-4 m-4 w-1/3">
                        <fieldset className="p-4 border border-gray-400 rounded-lg">
                            <legend>{date}</legend>
                            {entries.map((entry) => (
                                <div key={entry.id}>
                                    <p>Content: {entry.content}</p>
                                    <p>Mood: {entry.mood}</p>
                                    <br />
                                </div>
                            ))}
                        </fieldset>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

