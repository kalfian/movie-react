import React from 'react'
import './Home.css'
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config'
import HeroImage from '../elements/HeroImage/HeroImage'
import SearchBar from '../elements/SearchBar/SearchBar'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import MovieThumb from '../elements/MovieThumb/MovieThumb'
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn'
import Spinner from '../elements/Spinner/Spinner'

class Home extends React.Component{
    state = {
        movies: [],
        heroImage: null,
        loading:false,
        currentPage:0,
        totalPage:0,
        searchKey: '',
    }

    componentDidMount(){
        this.setState({
            loading:true,
        })
        const endpoint = API_URL+"movie/popular?api_key="+API_KEY+"&language=en-US&page=1"
        this.fetchItem(endpoint)
        
    }

    searchItem = (searchKeys) => {
        let endpoint = ''
        this.setState({
            movies: [],
            loading: true,
            searchKey: searchKeys
        })

        if(searchKeys === ''){
            endpoint = API_URL+"movie/popular?api_key="+API_KEY+"&language=en-US&page=1"
        }else{
            endpoint = API_URL+"search/movie?api_key="+API_KEY+"&language=en-US&page=1"+"&query="+searchKeys
        }
        this.fetchItem(endpoint)

    }

    loadMoreItems = () => {
        let endpoint = ''
        this.setState({loading:true})

        if(this.state.searchKey === ''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`
        }else{
            endpoint = API_URL+"search/movie?api_key="+API_KEY+"&language=en-US"+"&query="+this.state.searchKey+"&page="+this.state.currentPage+1
        }

        this.fetchItem(endpoint)
    }

    fetchItem = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                movies: [...this.state.movies, ...result.results],
                heroImage: this.state.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPage: result.total_pages
            })
             
        })
        .catch(error => console.log('Error:', error))
        
    }

    render(){

        const {heroImage,loading} = this.state

        return(
            
            <div className="rmdb-home">
            {heroImage ?
            <div>
                <HeroImage
                    image={IMAGE_BASE_URL+BACKDROP_SIZE+heroImage.backdrop_path}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />
                <SearchBar
                    callback={this.searchItem}
                />
            </div> : null}
            <div className="rmdb-home-grid">
                <FourColGrid
                    header={this.state.searchKey ? 'Search Result' : 'Popular Movies'}
                    loading={loading}
                >
                  {this.state.movies.map((e,i) => {
                      return <MovieThumb
                        key={i}
                        clickable={true}
                        image={e.poster_path ? IMAGE_BASE_URL+POSTER_SIZE+e.poster_path : './images/no_image.jpg'}
                        movieId={e.id}
                        movieName={e.original_title}
                      />
                  })}  
                </FourColGrid>
                {loading?<Spinner/>:null}
                {this.state.currentPage < this.state.totalPage && !this.state.loading
                 ?<LoadMoreBtn
                    onClick={this.loadMoreItems}
                    text="Load more"
                />:null
                }
            </div>
            
                
            </div>
        )
    }
}

export default Home