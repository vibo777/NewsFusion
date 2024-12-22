import { useState } from "react";

export default function CompState(){

    const [colors,setColors] = useState(["Blue","Green","Yellow","Pink","Orange"]); 

    const addColor=()=>{
        let copyColors = [...colors,"white"];  
        setColors(copyColors);
    }

    return(
        <>
            <h1>Your color choice is as follows : </h1>
            <h2>{colors}</h2>    
            <button className="btn btn-primary" onClick={addColor}>Add Color</button>    
        </>
    )
}