import { journalService } from "./services/journalService";

const JournalForm = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const content = formData.get('content') as string;
        const mood = formData.get('mood') as string;

        journalService.create(content, mood);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea name="content" id="content" placeholder="What did you do?"/>
                <select name="mood" id="mood">
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
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default JournalForm;