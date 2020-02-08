import React, {useState, useEffect} from 'react';
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import services from './services/blogs'
import Notif from './components/notifs'
import Toggo from './components/togglable'
import Butt from './components/newButton'
import ShowBlogDetails from './components/showBlogDetails'
import Blog from './components/Blog'

function App() {
  const [name, setName] = useState('')
  const [passWord, setPassWord] = useState('')
  let [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('');
  const [mssg, setMssg] = useState('');
  const [initialBlogs, setInitialBlogs] = useState([])

  const toggler = React.createRef()

  useEffect(() => {
    services.getAll()
            .then((res)=>{
              const sortedArray = res.data.sort((nth, mth) => mth.likes - nth.likes)
              setInitialBlogs(sortedArray)
            })
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedInUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      services.setToken(user.token)
    }
  }, [])
  const onChangeUser = (e) => {
    setName(e.target.value)
  }
  const onChangePass = (e) => {
    setPassWord(e.target.value)
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try{
        const userData = {
        username: name,
        password: passWord
      }

      const user = await services.login(userData) //token, username, and name
      setName('')
      setPassWord('')
      if (user) {
        setUser(user)
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        services.setToken(user.token)
      }
    }
    catch(e){
      setError('invalid username or password')
      setName('')
      setPassWord('')
      setTimeout(()=> setError(''), 3000)
    }
  }
  
  const logoutHandler = (e) => {
    window.localStorage.removeItem('loggedInUser')
    if (toggler.current.visible) toggler.current.toggleVisibility()
    setUser(null)
  }
  const onClickLikes = async (props) => {
    try{
      const body = {
        likes: props.likes + 1
        }
      await services.updateLike(props.id, body)
      let modItem = initialBlogs.map(function(each){
            if(props.id !== each.id) {return each}
            else {
              return {...each, likes: each.likes+1}
            }
          })
      setInitialBlogs(modItem)
    }
    catch(e){
      setError('Oops!Something went wrong.')
      setTimeout(()=> setError(''), 3000)
    }
  }

  const showBlogList = (initialBlogs) => {
    const style = {
                    borderStyle: 'solid',
                    borderRadius: 2,
                    padding: 5,
                    borderWidth: 1
                  }
    const onClickDelete = async (id) => {
      if (window.confirm(`Delete this entry?`)){
        try {
            const result = await services.deleteBlog(id)
            setInitialBlogs(initialBlogs.filter(each => each.id !== id))
            setMssg(`Deleted ${result.deletedCount} entry`)
            setTimeout(() => setMssg(''), 3000)
        } catch (error) {
          setError('Entry was not deleted')
        }
      }}
    return initialBlogs.map(item => (
        <li key={item.id}>
          <div style={style}>
              <Blog title={item.title} author={item.author}>
                  {/*<MainItem title={item.title} author={item.author} />*/}
                  <ShowBlogDetails url={item.url} likes={item.likes} listedUser={item.user} onClickLikes={()=>onClickLikes(item)} 
                  blogs={initialBlogs} loggedUser={user} id={item.id} title={item.title} onClickDelete={onClickDelete}></ShowBlogDetails>
              </Blog>
          </div>
        </li>
    ))
  }

  const ShowBlogNotes = (props) => (
    <>
      <div>
        <h1>Blogs</h1>
        <p>{`${user.name} logged in`} <button type="submit" onClick={logoutHandler}>Logout</button></p>
        <p>{Butt({onClickB:onClickB})}</p>
      </div>
      <div>
        <ul>
          {showBlogList(initialBlogs)}
        </ul>
      </div>
    </>
  )
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeAuthor = (e) => {
    setAuthor(e.target.value)
  }
  const onChangeUrl = (e) => {
    setUrl(e.target.value)
  }
  const onBlogSubmit = async (event) => {
    event.preventDefault()
    try{
      const newEntry = {title, author, url}
      setAuthor('')
      setTitle('')
      setUrl('')
      const entry = await services.createBlogNote(newEntry)
      //console.log(entry)
      setInitialBlogs(initialBlogs.concat(entry))
      setMssg(`new blog: ${newEntry.title} by ${newEntry.author} added!`)
      setTimeout(() => setMssg(''), 3000)
    }
    catch(e){
      setError('Blog was not posted')
      setTimeout(() => setError(''), 3000)
    }
  }
  const onClickB = () =>  {
    toggler.current.toggleVisibility()
  }

  return (
    <div className="App">
      <Notif error={error} mssg={mssg} />
      {user === null && LoginForm({name, passWord, onChangeUser, onChangePass, onSubmitHandler})}

      <Toggo ref={toggler}>
        <BlogForm onBlogSubmit={onBlogSubmit} title={title} author={author} url={url} onChangeTitle={onChangeTitle}
            onChangeAuthor={onChangeAuthor} onChangeUrl={onChangeUrl} />
      </Toggo>

      {user !== null && ShowBlogNotes(initialBlogs)}
    </div>
  )
}

export default App;
