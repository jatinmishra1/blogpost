import React ,{useState,useEffect}from "react"
import "./blog.css"
import { blog } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"
export const Card = ({ posts ,findPostBySearch}) => {
  const [query,setQuery]=useState()
  const [data,setData]=useState()
  // create file garnebelema
  const PublicFlo = "http://localhost:5000/images/"
  function handelClick(){
    setQuery(data)
    console.log(query)
    findPostBySearch(query)
  }
useEffect(()=>{

},posts)
  return (
    <>
      <section className='blog'>
      <input placeholder="search bar" onChange={(e)=>setData(e.target.value)}   style={{marginLeft:"600px",marginBottom:"40px", border:"2px solid black"}}/>
      <button onClick={handelClick}>Search</button>
        <div className='container grid3'>
       
          {posts.map((item) => (
            <div className='box boxItems' key={item.id}>
              {/* first ma yo  <div className='img'>{item.photo && <img src={item.cover} alt='' />}</div>*/}
              <div className='img'>{item.photo && <img src={PublicFlo + item.photo} alt='' />}</div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  {item.categories.map((c) => (
                    <a href='/'>#{c.name}</a>
                  ))}
                </div>
                <Link to={`/post/${item._id}`}>
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{new Date(item.createdAt).toDateString()}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
