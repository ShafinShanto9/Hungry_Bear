import React from 'react'
import '../resources/profilecard.css'

const ProfileCard = () => {
  const user = JSON.parse(localStorage.getItem('pos-user'))
  
  return (
            <div className='body'>
                <div className="">
                    <div className="card-container">
                      <div className="profile-image object-cover">
                          <img src="https://source.unsplash.com/100x100/?avatars" alt="" />
                      </div>    
                  <div className='card-descc'>
                  <h4 className='mt-15px text-center'><strong> { user?.name}</strong></h4>
                    <p>Hungry Bear Manager</p>
                </div>                
                </div>
                </div>                    
            </div>  
  )
}

export default ProfileCard