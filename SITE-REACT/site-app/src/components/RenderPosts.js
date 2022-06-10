import { CardMedia, Grid,Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import {FaHryvnia} from 'react-icons/fa'

import { Link } from 'react-router-dom'
import PaginationSelector from './PaginationSelector'

import Categories from './Categories'
import {FaDollarSign} from 'react-icons/fa'
const RenderPosts = (props) => {
    const category = props.category || ''

    const posts = props.posts || []

    const height = props.height || 30

    const width = props.width || 28

    const search = props.search

    const page = props.page

    const allpages = props.allPages
    
    const setPage = props.setPage


    const MsgEmptyData = `Nothing found to search : ${search}`

    const SetCurrentCategory =  props.SetCurrentCategory

    const body_length = 50 // max number of symbols in 1 post

    return(
        <div>
            <Grid container spacing={2}>
                {posts.length===0 && search.length >=3  && 
                <h1 style={{'fontFamily':'Impact, fantasy','color':'white'}}>{MsgEmptyData}</h1>
                }
                {posts.map((post) => {
                const post_link = `post/${post.name}`
                return(
                    <Grid item  md={4}  xs={12} key={post.id}>
                        <Card sx={{height:'100%'}}>
                            <CardMedia
                            component="img"
                            src = {post.photo}
                            alt = {post.name}
                            title = {post.name}
                            sx = {{height : 220}}
                            />
                            <CardContent>
                                <Typography
                                variant = "h6"
                                component = "h3"
                                >
                                    {post.name}
                                </Typography>
                                <Typography variant='body1'>Цена : {post.price}<FaDollarSign/></Typography>
                            </CardContent>
                            <CardActions>
                            <Link to={post_link}><button className='btn-selfmade' onClick={() => SetCurrentCategory('')}><span>Узнать больше</span><i></i></button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
            )})}
            </Grid>
    <PaginationSelector page={page} allPages={allpages} setPage={setPage}/>
    </div>
    )
}

export default RenderPosts 




{/* <img className="img-card" src={post.photo}alt="is loading..."/>
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
        <Link to={post_link}><button className='btn-selfmade' onClick={() => SetCurrentCategory('')}><span>Узнать больше</span><i></i></button></Link>
    </div>      */}