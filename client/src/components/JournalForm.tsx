import { useState } from "react";
import { journalService } from "../services/journalService";

interface JournalFormProps {
    content: string;
    mood: string;
    setContent: (value: string) => void;
    setMood: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isEditing: boolean; // Para mudar o texto do botão
    onCancelEdit: () => void; // Para cancelar a edição
}

const JournalForm = ({
    content,
    mood,
    setContent,
    setMood,
    onSubmit,
    isEditing,
    onCancelEdit,
}: JournalFormProps) => {
    return (
        <div className="bg-gray-200 dark:bg-gray-900 m-4 p-4 rounded-lg w-[60%]">
            <form onSubmit={onSubmit} className="flex items-center gap-3">
                <textarea
                    name="content"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What did you do?"
                    className="flex-1 resize-none rounded-md bg-gray-300 dark:bg-gray-700 rounded-lg px-3 py-2 w-[40%]"
                    rows={1}
                />

                <select
                    name="mood"
                    id="mood"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="bg-gray-300 dark:bg-gray-700 rounded-lg px-3 py-2 w-[25%]"
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
                    {isEditing ? "Update" : "Add"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-red-400 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transition duration-300 ease-in-out cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default JournalForm;
