import React, { useEffect, useState } from 'react'
import './player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [ApiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQ5ZjRlY2M1Njc0MjQxNDZmOGE1MWVkNzllODY3ZSIsIm5iZiI6MTc2MTM1NTMxMS4wNzIsInN1YiI6IjY4ZmMyNjJmNzcyZjE4NjU5Zjc5NGEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ANaQH7_en9p-wyWK2WVz3jUSaOR-aSwYLL6FBybSXY'
  }
};



useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));


},[])





  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${ApiData.key}`} title='trailer'frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{ApiData.published_at.slice(0,10)}</p>
        <p>{ApiData.name}</p>
        <p>{ApiData.type}</p>
      </div>
    </div>
  )
}

export default Player