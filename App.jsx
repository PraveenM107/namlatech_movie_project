import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function App() {
  const [movielist, setMovielist] = useState(null);
  const [error, setError] = useState(null);
  const COLLECTION_ID = 10;
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";
 useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/collection/${COLLECTION_ID}`,{
        headers:{
          accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmY1MjNlM2IzYjM4YzZiYWY4YjA4MGFkZTQwOTUxMyIsIm5iZiI6MTc3MzA1MzgxMi4xMTAwMDAxLCJzdWIiOiI2OWFlYTc3NDJiN2M0ZTBmZDc0NTA2M2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FWFJfE-PEzrh9l0JcQVEiLejzS2aTBm65wyNAniyGxs`
        }
      }).then((data)=>{
     console.log("BASE_URL:", BASE_URL)
console.log("TOKEN:", TOKEN)
      setMovielist(data.data)
    }).catch((err)=>console.log(err))
  },[])
useEffect(() => {
  axios
    .get(
      `https://api.themoviedb.org/3/collection/${COLLECTION_ID}?api_key=1bf523e3b3b38c6baf8b080ade409513`
    )
    .then((res) => {
      console.log(res.data);
      setMovielist(res.data);
    })
    .catch((err) => {
      console.log(err);
      setError("Failed to fetch movielist data");
    });
}, []);

  if (error) return <p style={{color:'red'}}>Error: {error}</p>;
  if (!movielist) return <p>Loading movie data...</p>;

  return (
    <>
      <section className="border border-b-[#7c7c89]">
        <div className="flex py-[20px] px-[50px] items-center justify-between">
          <h3 className="uppercase text-[2.5rem] text-indigo-600 font-bold cursor-pointer">
            Marvels Creation
          </h3>
          <button className="bg-green-400 cursor-pointer p-[10px] text-[17px] font-semibold capitalize rounded-md">
            Let's Go
          </button>
        </div>
      </section>

      <section className="p-[3rem] flex items-center justify-center">
        <div className="grid grid-cols-[1fr_1fr] gap-[5rem]">
          <div>
            <h1 className="text-[3rem] font-bold">{movielist.name}</h1>
            <p className="w-[67%] max-w-[30rem]">{movielist.overview}</p>
          </div>

          <div>
            <img
              src={`${IMG_BASE}${movielist.backdrop_path}`}
              className="h-[300px] object-cover"
              alt={movielist.name}
            />
          </div>
        </div>
      </section>

      <section className="mt-[50px] mx-[100px]">
        <div className="grid grid-cols-2 gap-[2rem]">
          {movielist.parts?.map((part) => (
            <div key={part.id} className="bg-[green] p-[1.5rem] rounded-lg">
              <img
                src={`${IMG_BASE}${part.backdrop_path}`}
                className="h-[200px] w-full object-cover rounded-md"
                alt={part.title}
              />

              <h3 className="text-[1.4rem] font-semibold text-orange-500 mt-2">
                {part.title}
              </h3>

              <p>{part.release_date?.slice(0, 4)}</p>

              <div className="flex gap-[10px] items-center">
                <div className="flex gap-[5px] text-green-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <span>{part.vote_average}</span>
                <span>{part.vote_count}</span>
              </div>

              <p className="text-sm mt-2">
                {part.overview?.slice(0, 120)}...
              </p>

              <div className="flex items-center justify-between mt-[1rem]">
                <span>{part.release_date}</span>

                <button className="text-black-500 font-semibold cursor-pointer bg-purple-400 p-[8px] rounded-lg">
                  view Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-[30px]">
        <p>Permission Granted </p>
      </section>
    </>
  );
}

export default App;