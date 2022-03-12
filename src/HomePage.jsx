import axios from 'axios';
import { useState, useEffect } from 'react';
import { Pagination, TextField, Stack, Link, PaginationItem } from '@mui/material';
import { Link as NavLink, useLocation, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

const HomePage = () => {
    const location = useLocation();
    const history = useNavigate();
    
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(parseInt(location.search?.split("=")[1] || 1));
    const [query, setQuery] = useState('react');
    const [pageQty, setPageQty] = useState(0);

    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page - 1}`)
        .then(({data}) => {
            setPosts(data.hits)
            setPageQty(data.nbPages)

            if(data.nbPages < page) {
                setPage(1)
                history('/')
            }
        })
    }, [query, page, history])
    
    return (
        <>
            <TextField
                fullWidth
                label='query'
                value={query}
                onChange={(event => setQuery(event.target.value))}
            />
            <Stack spacing={2}>
                {!!pageQty && (
                <Pagination
                    count={pageQty}
                    page={page}
                    onChange={(_, num) => setPage(num)}
                    showFirstButton
                    showLastButton
                    sx={{marginTop: 5, marginX: 'auto'}}
                    renderItem={
                        (item) => {
                            return( 
                                <PaginationItem
                                    component={NavLink}
                                    to={`/?page=${item.page}`}
                                    {...item}
                                />
                            )
                        }
                    }
                />  
                )}
                {
                    posts.map(post => {
                        return (
                            <Link 
                                key={post.objectID}
                                href={post.url}
                            >
                            {post.title || post.story_title}
                            </Link>
                        )
                        
                })
                }
            </Stack>
        </>
    )
}

export default HomePage;