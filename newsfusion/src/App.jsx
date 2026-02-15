import {useEffect, useState} from "react";
import.meta.env.NEWS_API_KEY;
import News from "./News";
 

function App() {

  useEffect(()=>{
    document.title = 'News App | Made with ❤️ in react'
  },[])

  let [articles,setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let [category,setCategory] = useState("geopolitics");
  const [currentPage,setCurrentPage] = useState(1);
  const [PostsPerPage] = useState(12);

  useEffect(() => {
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/.netlify/functions/news?category=${category}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load news");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, [category]);

  // calaculate pagination variable 
  const totalPosts = articles.length;
  const totalPages = Math.ceil(totalPosts/PostsPerPage);
  const startIndex = (currentPage - 1) * PostsPerPage;
  const endIndex = startIndex + PostsPerPage;
  const currentData = articles.slice(startIndex, endIndex);

  const handlePrevPage=()=>{
    if(currentPage>1){
      setCurrentPage((prev) => prev - 1);
    }
  }

  const handleNextPage=()=>{
    if(currentPage < totalPages){
      setCurrentPage((prev)=> prev + 1);
    }
  }

  const handlePageClick = (pageNumber) =>{
    setCurrentPage(pageNumber);
  }

  return (
    <div className="App">
      <header className="App-header">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
        <h1>NewsFusion</h1> 

        <input className="search-bar" onChange={(event)=>{
          if(event.target.value !== "")
          {
            setCategory(event.target.value);  
          }
          else{
            setCategory("cricket");
          }
        }} type="text" placeholder="Search News"/>
      </header>
       
      <section className="news-area">
        {/* Looping articles using Map */}
        { 
            currentData.length !== 0?

            currentData.map((article,index)=>{
              return(
                <News article={article} key={index}/>
              )
            })
            :
            <h2>Searched Text is Not Found !!!</h2>
        }
      </section>
      <section className="Pagination">
        <button className="arrow" id="prevPage" disabled={currentPage === 1} onClick={handlePrevPage}>
        ← <span className="nav-text d-none">PREV</span>
        </button>

        <div className="pages">
          {Array.from({length:totalPages},(_, index)=>(
           <div key={index} className={`page-number ${currentPage === index+1 ? "active" : ""}`}  onClick={() => handlePageClick(index + 1)}>{index+1}</div> 
          ))}
        </div>

        <button className="arrow" id="nextPage" disabled={currentPage === totalPages} onClick={handleNextPage}>
          <span className="nav-text d-none">NEXT</span> →
        </button>  
      </section>
    </div>
  );
}

export default App;