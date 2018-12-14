import React,{Fragment} from 'react'
import Header from '../elements/Header/Header'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../Home/Home'
import Movie from '../Movie/Movie'
import NotFound from '../NotFound/NotFound'

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Header/>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/:movieId" component={Movie} exact />
                    <Route component={NotFound}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    )
}

export default App;