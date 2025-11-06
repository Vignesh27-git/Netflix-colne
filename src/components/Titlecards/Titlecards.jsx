import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import { Link } from 'react-router-dom'

const Titlecards = ({ title, category }) => {

  const [ApiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQ5ZjRlY2M1Njc0MjQxNDZmOGE1MWVkNzllODY3ZSIsIm5iZiI6MTc2MTM1NTMxMS4wNzIsInN1YiI6IjY4ZmMyNjJmNzcyZjE4NjU5Zjc5NGEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ANaQH7_en9p-wyWK2WVz3jUSaOR-aSwYLL6FBybSXY'
    }
  };

  useEffect(() => {

    // 1) Fetch API data
    fetch(`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    // 2) Horizontal scroll on wheel / touchpad
    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    };

    const el = cardsRef.current;
    el.addEventListener("wheel", handleWheel, { passive: true });

    // 3) Remove listener on cleanup
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };

  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {ApiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Titlecards;
