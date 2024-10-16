import {Articles} from "../interfaces/Articles";
import ArticleRow from "./ArticleRow";

export interface ArticleTableProps {
    articles: Articles[];
    setArticles: (articles: Articles[]) => void;
}

function ArticleTable({articles, setArticles}: ArticleTableProps) {
    const updatedArticle = (key: string, updatedData: Partial<Articles['data']>) => {
        if (!key) {
            console.error('No key provided to update articles');
            return;
        }
        const updatedArticles = articles.map(
            article => article.key === key 
                ? {...article, data: { ...article.data, ...updatedData }}
                : article
        );
        setArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" className="text-bold">Title</th>
                    <th scope="col" className="text-bold">Author</th>
                    <th scope="col" className="text-bold">Published</th>
                    <th scope="col" className="text-bold">Comment</th>
                    <th scope="col" className="text-bold">Statut</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article) => (
                    <ArticleRow key={article.data?.key} articles={article} updateArticles={updatedArticle} />
                ))}
            </tbody>
        </table>
    )
}

export default ArticleTable;