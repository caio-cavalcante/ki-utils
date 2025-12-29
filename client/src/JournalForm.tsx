import { journalService } from "./services/journalService";

interface JournalFormProps {
    onEntryCreated: () => void;
}

const JournalForm = ({ onEntryCreated }: JournalFormProps) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const content = formData.get('content') as string;
        const mood = formData.get('mood') as string;

        await journalService.create(content, mood);
        onEntryCreated();
        event.currentTarget.reset();
    };

    return (
        <div className="bg-gray-900 m-4 p-4 rounded-lg w-[90%]">
            <form onSubmit={handleSubmit}>
                <textarea name="content" id="content" placeholder="What did you do?"
                className="bg-gray-700 rounded-lg p-2 w-[60%]"/>
                <select name="mood" id="mood" className="bg-gray-700 rounded-lg p-2 w-[15%]">
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Afraid">Afraid</option>
                    <option value="Disgusted">Disgusted</option>
                    <option value="Angry">Angry</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Jealous">Jealous</option>
                    <option value="Embarrassed">Embarrassed</option>
                    <option value="Bored">Bored</option>
                    <option value="Surprised">Surprised</option>
                    <option value="Tired">Tired</option>
                </select>
                <button type="submit" className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">Save</button>
            </form>
        </div>
    )
}

export default JournalForm;