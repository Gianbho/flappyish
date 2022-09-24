import React from 'react'
import Heart from '../../assets/heart.png'
import './livesCard.css'

const LivesCard = (props) => {
  return (
    <>
    <div className='lives-card'>
        <img src={Heart} alt='lives' />
        <span>{props.lives}</span>
    </div>
    </>
  )
}

export default LivesCard