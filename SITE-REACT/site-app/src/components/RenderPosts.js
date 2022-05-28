import { useEffect, useState } from 'react'
import {FaHryvnia} from 'react-icons/fa'

import { Link } from 'react-router-dom'
import PaginationSelector from './PaginationSelector'

const RenderPosts = (props) => {
    const category = props.category || ''

    const posts = props.posts || []

    const height = props.height || 30

    const width = props.width || 28

    const search = props.search

    const page = props.page

    const allpages = props.allPages
    

    const MsgEmptyData = `Nothing found to search : ${search}`



    const body_length = 50 // max number of symbols in 1 post

    return(
        <div className>
            {posts.length===0 && search.length >=3  && 
            <h1 style={{'fontFamily':'Impact, fantasy'}}>{MsgEmptyData}</h1>
            }
            <div className='row' style={{'width':70+'%'}}>
            {posts.map((post) => {
            const post_link = `post/${post.name}`
            return(
                <div className='col-xs-12 col-sm-2' key={post.id}>
                <div key={post.id}>
                    <div className='card bg-primary mb-1'>
                    <img className="img-card" src={post.photo}alt="is loading..."/>
                    <div className='card-content'><Link to={post_link}><h5 class="card-header" style={{'color':'white'}}>{post.name}</h5></Link>
                        <div className="card-title" style={{'color':'white'}}>
                                { post.body.length > body_length 
                                ?(<div className="card-text" style={{'color':'white','maxHeight':100+'px','maxWidth':200+'px','height':100+'px','width':200+'px'}}><p>{post.body.substring(0,body_length)} ...</p>
                                </div>)
                                :(<div className="card-text" style={{'color':'white','maxHeight':100+'px','maxWidth':200+'px','height':100+'px','width':200+'px'}}><p>{post.body}</p>
                                    
                                </div>)
                                }
                        </div>      </div>                  
                        <div className="card-read-more">
                            <h4 className="font-italic">{post.price}<FaHryvnia style={{'width':10+'%','paddingTop':3+'px'}}/></h4>
                            <Link to={post_link}><button className='btn btn-info'>Узнать больше</button></Link>
                        </div>                          
                    </div>
                </div>
        </div>
        )})}
            </div>
            <PaginationSelector page={page} allPages={allpages}/>
        </div>
    )
}

export default RenderPosts 


