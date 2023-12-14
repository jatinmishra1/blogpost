import React, { useEffect, useState } from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"
import axios from "axios"
import { useLocation } from "react-router-dom"

export const Home = () => {
  const [posts, setPosts] = useState([])

  // setp 2
  const { search } = useLocation()
  // const location = useLocation()
  //console.log(location)
 async function findPostBySearch(query){
  if(query===undefined){
    const res = await axios.get("/posts" + search)
    setPosts(res.data)
  }else{
    const res = await axios.get("/posts" + search)
    if(res){
      
      let searched_posts=[]
      for(let i=0;i<res.data.length;i++){
        if(res?.data[i]?.title.includes(query)){
          searched_posts.push(res.data[i])
        }
      }
      setPosts(searched_posts)
    }
  }
 
  
 
}
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])
  return (
    <>
      <Category />
      <Card posts={posts} findPostBySearch={findPostBySearch} />
    </>
  )
}
