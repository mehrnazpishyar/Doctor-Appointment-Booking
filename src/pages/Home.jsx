import React from 'react'
import Header from '../components/Header'
import SpecialtyList from '../components/SpecialtyList'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialtyList/>
      <TopDoctors/>
    </div>
  )
}

export default Home