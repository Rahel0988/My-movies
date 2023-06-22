"use client";
import { POST,GET } from '../api/route';
import { useState, useEffect, useRef, FormEventHandler } from 'react';
import { format } from 'util';

interface Comment {
    id: string;
    createdTime: string;
    fields: {
        comment: string;
        name: string;
        status: 'published' | 'pending-for-moderation'
    }
}

const formatDate = (date: string) => {
    return format(new Date(date), 'd.MM.Y HH:mm:ss');
}

function Comments() {
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [comments, setComments] = useState<Comment[] | null>(null);

    const loadComments = () => {
        fetch('/comments/api')
        .then(response => response.json())
        .then(data => {
            setComments(data);
        })
        .catch(() => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadComments();
    }, []);

    const handleSubmit: FormEventHandler  = (event) => {
        event.preventDefault();
        const commentContent = commentRef.current?.value || '';
        if (commentContent) {
          
            fetch('/comments/api', {
                method: 'POST',
                body: JSON.stringify({ commentContent: commentContent }),
            })
            .then(response => {
                if (response.ok) {
                    loadComments();
                }
            })
        }
    }

    return (
        <main className="mt-6">
            <h1>comments</h1>
            
            {isError ? <p>Error!</p> : null}
            {isLoading && <p>Loading...</p>}
            <div>
                {comments && comments.map((elem) => {
                    return (
                        <div key={elem.id}>{elem.fields.comment} ({elem.fields.status}, {formatDate(elem.createdTime)})</div>
                    )
                })}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="comment_body"></label>
                        <textarea id="comment_body" ref={commentRef} style={{ color: 'blue '}} />
                    </div>
                    <div>
                        <input type="submit" value="Send" />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Comments;