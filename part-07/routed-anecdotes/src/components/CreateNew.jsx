import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useField } from './hooks'

const CreateNew = ({ addNew, setNotification }) => {
    // const [content, setContent] = useState('');
    // const [author, setAuthor] = useState('');
    // const [info, setInfo] = useState('');

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });

        setNotification(`a new anecdote ${content}`);
        setTimeout(() => {
            setNotification(null);
        }, 5000);

        navigate('/');
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={content.value} onChange={content.onChange} />
                </div>
                <div>
                    author
                    <input name='author' value={author.value} onChange={author.onChange} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={info.value} onChange={info.onChange} />
                </div>
                <button>create</button>
            </form>
            <button onClick={() => { content.reset(); author.reset(); info.reset()}}>
                reset
            </button>
        </div>
    )

}

export default CreateNew