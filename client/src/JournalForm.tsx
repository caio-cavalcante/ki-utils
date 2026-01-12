import { useState } from "react";
import { journalService } from "./services/journalService";

interface JournalFormProps {
    onEntryCreated: () => void;
}

const JournalForm = ({ onEntryCreated }: JournalFormProps) => {
    const [selectedMood, setSelectedMood] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const content = formData.get("content") as string;
        const mood = formData.get("mood") as string;

        await journalService.create(content, mood);
        onEntryCreated();
        form.reset();
        setSelectedMood("");
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-900 m-4 p-4 rounded-lg w-[60%]">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <textarea
                    name="content"
                    id="content"
                    placeholder="What did you do?"
                    rows={1}
                    className="flex-1 resize-none rounded-md bg-gray-300 dark:bg-gray-700 rounded-lg px-3 py-2 w-[40%]"
                />

                <select
                    name="mood"
                    id="mood"
                    className="bg-gray-300 dark:bg-gray-700 rounded-lg px-3 py-2 w-[25%]"
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                >
                    <option value="" disabled>
                        How did you feel?
                    </option>
                    <optgroup label="Happy">
                        <option value="joyful">Joyful</option>
                        <option value="content">Content</option>
                        <option value="excited">Excited</option>
                    </optgroup>

                    <optgroup label="Loved">
                        <option value="appreciated">Appreciated</option>
                        <option value="valued">Valued</option>
                        <option value="accepted">Accepted</option>
                    </optgroup>

                    <optgroup label="Confident">
                        <option value="brave">Brave</option>
                        <option value="hopeful">Hopeful</option>
                        <option value="powerful">Powerful</option>
                    </optgroup>

                    <optgroup label="Playful">
                        <option value="creative">Creative</option>
                        <option value="curious">Curious</option>
                        <option value="interested">Interested</option>
                    </optgroup>

                    <optgroup label="Sad">
                        <option value="disappointed">Disappointed</option>
                        <option value="hurt">Hurt</option>
                        <option value="lonely">Lonely</option>
                    </optgroup>

                    <optgroup label="Scared">
                        <option value="anxious">Anxious</option>
                        <option value="worried">Worried</option>
                        <option value="powerless">Powerless</option>
                    </optgroup>

                    <optgroup label="Angry">
                        <option value="overwhelmed">Overwhelmed</option>
                        <option value="frustrated">Frustrated</option>
                        <option value="annoyed">Annoyed</option>
                    </optgroup>

                    <optgroup label="Embarrassed">
                        <option value="ashamed">Ashamed</option>
                        <option value="guilty">Guilty</option>
                        <option value="excluded">Excluded</option>
                    </optgroup>
                </select>

                <button
                    type="submit"
                    className="bg-green-400 hover:bg-green-700 text-white font-bold px-4 py-2 rounded transition duration-300 ease-in-out cursor-pointer"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default JournalForm;
