import React from 'react'
import { API_URL, API_KEY } from '../../config'
import Navigation from '../elements/Navigation/Navigation'
import MovieInfo from '../elements/MovieInfo/MovieInfo'
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import Actor from '../elements/Actor/Actor'
import Spinner from '../elements/Spinner/Spinner'
import './Movie.css'

class Movie extends React.Component{
    state = {
        movie : null,
        actors : null,
        directors: [],
        loading: false
    }

    componentDidMount(){
        this.setState({ loading:true })

        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`

        this.fetchItem(endpoint)
    }

    fetchItem(endpoint){
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            if(result.status_code){
                this.setState({ loading:false })
            }else{
                this.setState({ movie: result }, ()=>{
                    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}&language=en-US`
                    fetch(endpoint)
                    .then(result => result.json())
                    .then(result => {
                        const directors = result.crew.filter((member) => member.job === "Director")
                        this.setState({
                            actors: result.cast,
                            directors: directors,
                            loading: false
                        })
                    }) 
                })
            }
        }).catch(error => console.error('Error: ',error))
    }

    render(){
        const { loading } = this.state
        
        return(
            <div className="rmdb-movie">
                {this.state.movie ? 
                <div>
                    <Navigation
                        movie={this.state.movie.original_title}
                    />
                    <MovieInfo
                        movie={this.state.movie}
                        directors={this.state.directors}
                    />
                    <MovieInfoBar
                        time={this.state.movie.runtime}
                        budget={this.state.movie.budget}
                        revenue={this.state.movie.revenue}
                    />
                </div>
                : null }
                {this.state.actors ? 
                    <FourColGrid header={'Actors'}>
                        { this.state.actors.map((e,i) => {
                            return <Actor key={i} actor={e} />
                        })}
                    </FourColGrid> : null
                }
                {!this.state.actors && !loading ? <h1>No Movie Found!</h1> : null}
                
                { loading ? <Spinner/> : null}
            </div>
        )
    }
}

export default Movie