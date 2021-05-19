import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'

export default function Home({ properties }) {
  console.log(properties)

  const book = (property) => {
    // connectToDatabaseここではブラウザ側なので使えないのでapiを呼ぶ

  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {properties && properties.map((property) => {
        return (
        <div key={property._id}>
          <div>{property.name}</div>
          <div>{property.images}</div>
          <div>{property.summary}</div>
          <div>{property.address.street}</div>
          <div>{property.guests}</div>
          <div>{property.price}</div>
          {/* <div>{property.cleaningFee}</div> */}
          <button onClick={() => book(property)}></button>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()
  // findでfilterしていない。
  // const data = await db.collection("listingsAndReviews").find({}).project({_id: 1, image: 1}).limit(20).toArray()
  const data = await db.collection("listingsAndReviews").find({}).limit(20).toArray() // 5000ものデータが返ってくるのでリミットをつけている
  // getServerSidePropsを使うとserver側からサニタライズされたpropsを渡せないため
  const properties = JSON.parse(JSON.stringify(data))

  // mongodbが返す値には$マークがついていてjsonではそれは解析できないため
  const filtered = properties.map((property) => {
    const price = JSON.parse(JSON.stringify(property.price))
    // const cleaningFee = JSON.parse(property.cleaningFee)
  
    return {
      _id: property._id,
      name: property.name,
      image: property.images.picture_url,
      address: property.address,
      summary: property.summary,
      guests: property.accommodates,
      price: price.$numberDecimal,
      // cleaning_fee: cleaningFee
    }
  })
  console.log(properties)
  return {
    props: { properties: filtered },
  }
}
