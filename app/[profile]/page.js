import PaymentPage from '../components/PaymentPage'
import { notFound } from 'next/navigation'
import { fetchuser } from '@/actions/useraction'
import React from 'react'

const Profile = async (props) => {

  const { profile } = await props.params
  const usrName = decodeURIComponent(profile)


  let user = await fetchuser(usrName)

  if (!user) {
    return notFound()
  }

  return (

    <PaymentPage username={usrName} />
  )

}

export default Profile

export async function generateMetadata({params}) {
  const { profile } = await params
  const usrName = decodeURIComponent(profile)

  return { title: `Support ${usrName} - Get Me A Chai ` }
}