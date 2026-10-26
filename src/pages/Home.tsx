import React from 'react'
import Header from '../components/Header'
import SpecialtyList from '../components/SpecialtyList'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialtyList/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home