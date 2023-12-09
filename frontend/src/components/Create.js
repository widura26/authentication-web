const CreatePage = () => {
    <div>
        <h1>Create Page</h1>
        <form>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" id="title"></input><br/><br/>
            <label htmlFor="description">Description: </label>
            <textarea name="description" id="description"></textarea><br/><br/>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default CreatePage;