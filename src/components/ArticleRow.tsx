import { useState } from "react";
import { Articles } from "../interfaces/Articles";

export interface ArticleRowProps {
    articles: Articles;
    updateArticles: (key: string, articles: Partial<Articles['data']>) => void;
}

function ArticleRow({articles, updateArticles}: ArticleRowProps) {
    const [comment, setComment] = useState<string>(articles.data?.comment || '')


    const handleStatusChange = () => {
        const newStatus = articles.data?.statut === 'read' ? 'unread' : 'read';
        if (articles.data?.key) {   
            updateArticles(articles.data.key, { statut: newStatus })
        }
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newComment = e.target.value;
        setComment(newComment);
        if (articles.data?.key) {
            updateArticles(articles.data.key, { comment: newComment })
        }
    }

    const handleCommentSubmit = () => {
        if (articles.data?.key) {
            updateArticles(articles.data.key, { comment })
            setComment('')
        }
    }
    return (
        <tr className="m-4">
            <td className="w-25">
                <a href={articles.data?.url}>{articles.data?.title}</a>
            </td>
            <td style={{width: '20%'}}>
                {articles.data && articles.data.creators && Array.isArray(articles.data.creators) && articles.data.creators.length > 0 
                    ? articles.data.creators.map((creator, index: number) => (
                        <span key={index}>
                            {creator.firstName} {creator.lastName}{articles.data && articles.data.creators && index < articles.data.creators.length - 1 && ', '}
                        </span>
                    ))
                    : 'Unknown'}
            </td>
            <td>{articles.data?.date}</td>
            <td className="w-25">
                <div className="form-group mb-2">
                    <input 
                        className="form-control"
                        type="text" 
                        value={comment}
                        onChange={handleCommentChange} 
                        placeholder='Add a comment'
                    />
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleCommentSubmit}>Send</button>
            </td>
            <td>
                <button type="button" className={`btn ${articles.data?.statut !== 'read' ? 'btn-danger' : 'btn-success'}`} onClick={handleStatusChange}>
                    {articles.data?.statut}
                </button>
            </td>
        </tr>
    )
}

export default ArticleRow;