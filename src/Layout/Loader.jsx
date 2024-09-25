import React from 'react'
import loader from "./Loader.gif"
const Loader = () => {
  return (
    <div className="container container-loder">
        <figure>
            <img src={loader} alt="" width={"100%"} height={"auto"} />
        </figure>
      
    </div>
  )
}

export default Loader