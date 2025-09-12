import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import {useState,useEffect} from 'react';

function App() {
  const [data,setData] = useState([]);
  const [posts,setPosts] = useState([]);
  const [count,setCount] = useState(10);
  const [search,setSearch] = useState('');
  const [toggle,setToggle] = useState(false);

  const handleAddPost=(userId,title,body)=>{
    setPosts(prevData=>[{userId:userId,id:prevData.length+1,title:title,body:body},...prevData]);
  }
  useEffect(()=>{
    async function fetchData(){
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setData(json);
      // setPosts(data.slice(0,count));
      setCount(10);      
    }
    fetchData();
  },[])
  useEffect(()=>{
    setCount(10);
    setPosts(data.slice(0,count));
  },[data])
  useEffect(()=>{
    setPosts(data.slice(0,count));
  },[count])

  return (
    <div className="App">
      <header className="App-header">
        <input className="searchbar" type="text" value={search} placeholder='search' onChange={(e)=>setSearch(e.target.value)}/>
        <div style={{display:'flex',justifyContent:'center'}}>
          <div className="posts">
            {search===''?
            posts.map((item,index)=>(<Card key={index} Id={item.id} title={item.title} body={item.body} userId={item.userId}/>))
          :data.map((item,index)=>{
              if(item.title.includes(search)){
                return (<Card key={index} Id={item.id} title={item.title} body={item.body} userId={item.userId}/>)
              }
            })
          }
          <button onClick={()=>setCount(prev => prev+10)}>Load More</button>
          </div>
          <div className='formdiv'>
            <br/>
            <button onClick={()=>setToggle(prev => !prev)}>{toggle?'Hide Form':'Add Post'}</button>
            {toggle && <form className='postform' onSubmit={(e)=>{
              const userId = e.target.userId.value;
              const title = e.target.title.value;
              const body = e.target.body.value;
              handleAddPost(userId,title,body);
              e.target.userId.value='';
              e.target.title.value='';
              e.target.body.value='';
            }}>
              <input type="number" name="userId" placeholder='User ID' required/>
              <input type="text" name="title" placeholder='Title' required/>
              <textarea name="body" placeholder='Body' required></textarea>
              <button type="submit">Add Post</button>
            </form>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
