import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Post from './components/Post';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [reactions, setReactions] = useState({});

    useEffect(() => {
        fetch('/api/read_feeds/')
            .then(response => response.json())
            .then(data => {
                setPosts(data.feed_posts);
                setReactions(data.post_reactions);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <Sidebar />
                <div className="content">
                    {posts.map(post => (
                        <Post key={post.id} post={post} reactions={reactions[post.reference_id]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
