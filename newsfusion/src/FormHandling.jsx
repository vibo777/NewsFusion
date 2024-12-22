import { useState } from "react"

export default function FormHandling(){

    let FormName = "Newsletter";
    let [details,setDetails] = useState({
        name:"",
        email:""
    });

    function handleInput(event)
    {
       setDetails((prevObj)=>{
         return {...prevObj,[event.target.name]:event.target.value}
       })
      
    }
   
    function handleSubmit(event)
    {   
        event.preventDefault(); // Prevent form from reloading the page
        console.log(details);
    }

    return(
        <form>
            <div className="container form-container d-flex justify-content-center align-items-center">
                <div className="row form-input">  
                    <h1>{FormName}</h1>  
                    <input type="text" name="name"  onChange={handleInput} placeholder="Enter your name" value={details.name}/>
                    <input type="text" name="email"  onChange={handleInput} placeholder="Enter Email" value={details.email}/>
                    <button className="btn btn-primary" onClick={handleSubmit}>Subscribe</button>
                    
                </div>
            </div>
        </form>
    )
}