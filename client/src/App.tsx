import { useEffect, useState } from "react";

interface Message {
    message: string;
}

const App = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch('/api/');
                const data: Message = await response.json();
                setMessage(data.message);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchMessage();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="App">
            <h1>Hello World from the frontend!</h1>
            <h1>{message}</h1>
        </div>
    );
}

export default App;
