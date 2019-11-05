import './find.less'
import React from 'react'
import { NonServerData } from '@store/people-store'
import FindCard from './findCard'
export default function findContent() {
  const datas =  NonServerData.popFindData()
  return (
      <div className="find-content">
        <FindCard data={datas}/>
      </div>

  )
}
