import { connectToDatabase } from "../../util/mongodb"


export default async function handler(req, res){
  const { db } = await connectToDatabase() // clientも返されるが使わないためdbのみ。clientは他のdbに接続したりする
  const data = await db.collection("listingsAndReviews").find({}).limit(20).toArray() // 5000ものデータが返ってくるのでリミットをつけている
  res.json(data)
}