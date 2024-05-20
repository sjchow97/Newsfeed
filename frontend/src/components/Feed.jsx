import React, { useState, useEffect } from 'react';

const Feed = () => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch("http://127.0.0.1:8000/api/rss/read_feeds/");
            const data = await res.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
};
export default Feed;