import { useEffect, useState } from "react";
import { journalService, type JournalEntry } from "./services/journalService";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = journalService.getAll();
                setEntries(await response);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="App">
            <h1>Journal Entries</h1>
            <div>
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
                    <div key={date} className="p-4 m-4">
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
