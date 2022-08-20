import { IconButton } from '@material-ui/core'
import React from 'react'
import './SwipeButtons.css'
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashOnIcon from '@material-ui/icons/FlashOn'

function SwipeButtons() {
    return (
      <div className='swipeButtons'>
        <IconButton className='swipeButtons__repeat'>
          <ReplayIcon fontSize='large' />
        </IconButton>
        <IconButton className='swipeButtons__left'>
          <CloseIcon fontSize='large' />
        </IconButton>
        <IconButton className='swipeButtons__star'>
          <StarIcon fontSize='large' />
        </IconButton>
        <IconButton className='swipeButtons__right'>
          <FavoriteIcon fontSize='large' />
        </IconButton>
        <IconButton className='swipeButtons__lightning'>
          <FlashOnIcon fontSize='large' />
        </IconButton>
      </div>
    )
}

export default SwipeButtons
