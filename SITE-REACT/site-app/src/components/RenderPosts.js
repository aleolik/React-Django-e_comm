import { useState } from 'react'
import {FaHryvnia} from 'react-icons/fa'

import { Link } from 'react-router-dom'
const RenderPosts = (props) => {
    const category = props.category || ''
    const posts = props.posts || []

    const height = props.height || 30

    const width = props.width || 28

    const body_length = 80 // max number of symbols in 1 post

    const bgcolor = props.bgcolor || 'card bg-dark mb-1'

    return(
        <div className='card-group'>
            {posts.map((post) => {
            const post_link = `post/${post.name}`
            return(
                <div key={post.id} className=''>
                    <div className={bgcolor} style={{'width' : width+'rem','height':height+'rem'}}>
                        <h5 class="card-header" style={{'color':'white'}}>{post.name}</h5>
                        <img className="card-img-top" src={post.photo} style = {{'width':380+'px','height':  225+'px'}} alt="is loading..."/>
                           <div className="card-body" style={{'width':400+'px','color':'white'}}>
                               <Link to={post_link}>
                                { post.body.length > body_length 
                                ?(<div className="card-text" style={{'color':'white'}}><p style={{'cursor':'pointer'}}>{post.body.substring(0,body_length)} ...</p></div>)
                                :(<div className="card-text" style={{'color':'white'}}><p style={{'cursor':'pointer'}}>{post.body}</p></div>)
                                }
                                </Link>
                             </div>                        
                            <div className="card-footer">
                                <h4 className="font-italic">{post.price}<FaHryvnia style={{'width':10+'%','paddingTop':3+'px'}}/></h4>
                            </div>
                            
                     </div>
                </div>
            )})}        
        </div>
    )}

export default RenderPosts 