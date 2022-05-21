import { useState } from 'react'
import {FaHryvnia} from 'react-icons/fa'

import { Link } from 'react-router-dom'
const RenderPosts = (props) => {
    const category = props.category || ''
    const posts = props.posts || []

    const height = props.height || 30

    const width = props.width || 28

    const body_length = 80 // max number of symbols in 1 post



    let start = 0 // 6 in a row - col-2
    return(
        <div>
        {posts.length >= 4 
        ? ( <div className='card-deck'>
                {posts.map((post) => {
                console.log(post.photo)
                const post_link = `post/${post.name}`
                return(
                    <div className='col-3' key={post.id}>
                    <div key={post.id} className='card' style={{"maxWidth":540+"px",'width':100+'%','maxHeight':480+'px'}}>
                        <div className='card bg-primary mb-1'>
                        <Link to={post_link}><h5 class="card-header" style={{'color':'white'}}>{post.name}</h5></Link>
                            <img className="img-fluid rounded-start" src={post.photo}alt="is loading..." style={{'maxHeight':250+'px','maxWidth':540+'px'}}/>
                            <div className="card-body" style={{'color':'white'}}>
                                    { post.body.length > body_length 
                                    ?(<div className="card-text" style={{'color':'white'}}><p>{post.body.substring(0,body_length)} ...</p>
                                    </div>)
                                    :(<div className="card-text" style={{'color':'white'}}><p>{post.body}</p>
                                        
                                    </div>)
                                    }
                            </div>                        
                            <div className="card-footer">
                                <h4 className="font-italic">{post.price}<FaHryvnia style={{'width':10+'%','paddingTop':3+'px'}}/><Link to={post_link}><button className='btn btn-info'>Узнать больше</button></Link></h4>
                            </div>                          
                        </div>
                    </div>
                </div>
        )})}     
            </div>)
        : (
            <div className='card-deck'>
                {posts.map((post) => {
                const post_link = `post/${post.name}`
                return(
                    <div className='col'  key={post.id}>
                    <div key={post.id} className='card' style={{"maxWidth":540+"px",'width':100+'%','maxHeight':480+'px'}}>
                        <div className='card bg-primary mb-1'>
                        <Link to={post_link}><h5 class="card-header" style={{'color':'white'}}>{post.name}</h5></Link>
                            <img className="img-fluid rounded-start" src={post.photo}alt="is loading..." style={{'maxHeight':250+'px','maxWidth':540+'px'}}/>
                            <div className="card-body" style={{'color':'white'}}>
                                    { post.body.length > body_length 
                                    ?(<div className="card-text" style={{'color':'white'}}><p>{post.body.substring(0,body_length)} ...</p>
                                    </div>)
                                    :(<div className="card-text" style={{'color':'white'}}><p>{post.body}</p>
                                        
                                    </div>)
                                    }
                            </div>                        
                            <div className="card-footer">
                                <h4 className="font-italic">{post.price}<FaHryvnia style={{'width':10+'%','paddingTop':3+'px'}}/><Link to={post_link}><button className='btn btn-info'>Узнать больше</button></Link></h4>
                            </div>                          
                        </div>
                    </div>
                </div>
        )})}     
            </div>
        )}
        </div>
    )
}

export default RenderPosts 


