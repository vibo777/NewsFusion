import {useEffect, useState} from "react";
import News from "./News";
 

function App() {

  useEffect(()=>{
    document.title = 'News App | Made with ❤️ in react'
  },[])

  let [articles,setArticles] = useState([]);
  let [category,setCategory] = useState("GenAI");
  const [currentPage,setCurrentPage] = useState(1);
  const [PostsPerPage] = useState(12);

  useEffect(()=>{
    fetch(`https://newsapi.org/v2/everything?q=${category}&apiKey=4de7e0bee8234b48a486aa83403ef7ae`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'newsfusion',
      },
    })
    .then((response)=>response.json())
    .then((news)=>{
      setArticles(news.articles);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[category])

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