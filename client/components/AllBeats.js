import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllBeats} from '../store/beat'
import {Button} from '@material-ui/core'
import {addBeatToCart} from '../store/cart'

import ProductCategories from './modules/views/ProductCategories'
import ProductSmokingHero from './modules/views/ProductSmokingHero'
import AppFooter from './modules/views/AppFooter'
import ProductHero from './modules/views/ProductHero'
import ProductValues from './modules/views/ProductValues'
import ProductHowItWorks from './modules/views/ProductHowItWorks'
import ProductCTA from './modules/views/ProductCTA'
import AppAppBar from './modules/views/AppAppBar'

/**
 * COMPONENT
 */

export class AllBeats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ''
    }
  }

  async componentDidMount() {
    await this.props.getAllBeats()

    const user = await this.props.user
    this.setState({userId: user.id})
  }

  addBeat(beatId) {
    this.props.addBeatToCart(this.state.userId, beatId)
  }

  render() {
    let beats = this.props.beats.beats
    return (
      <div>
        <React.Fragment>
          {/* <ProductHero />
          <ProductValues /> */}
          {/* <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero /> */}

          <h1 align="center">Browse Beats</h1>
          {beats ? (
            <ul>
              {beats.map(beat => (
                <li key={beat.id}>
                  <Link key={beat.id} to={`/beats/${beat.id}`}>
                    <h2> {beat.title} </h2>
                  </Link>
                  <img src={beat.imgUrl} height="400" width="600" />
                  <br />
                  <Button
                    onClick={this.addBeat.bind(this, beat.id)}
                    className="white-link "
                    color="secondary"
                    variant="contained"
                  >
                    Add to cart
                  </Button>

                  <p>Release Date: {beat.releasedDate}</p>
                  <p>Genre: {beat.genre}</p>
                  <p>Price: {beat.price}</p>
                  <p>Rating: {beat.rating}</p>
                </li>
              ))}
            </ul>
          ) : (
            <h2>Loading...</h2>
          )}
        </React.Fragment>
        <AppFooter />
      </div>
    )
  }
}

const mapState = state => {
  return {
    beats: state.beat,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getAllBeats: () => dispatch(getAllBeats()),
    addBeatToCart: (userId, beatId) => dispatch(addBeatToCart(userId, beatId))
  }
}

export default connect(mapState, mapDispatch)(AllBeats)
