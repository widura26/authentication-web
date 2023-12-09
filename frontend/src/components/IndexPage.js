const IndexPage = ({ navigate }) => {
    return (
        <button onClick={() => navigate('/create-post')}>Create post</button>
    )
}

export default IndexPage;