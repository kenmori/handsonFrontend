import { connectToDatabase } from "../../util/mongodb"


export default async function handler(req, res){
  const { db } = await connectToDatabase() // clientも返されるが使わないためdbのみ。clientは他のdbに接続したりする
  const data = await db.collection("listingsAndReviews").aggregate([
    {
      $search: {
        search: {
          query: req.query.term,
          path: ["description", "amenities"] // 検索するfield
        }
      }
    },
    {
      $project: { // descriptionとamenitiesだけ返す
        description: 1,
        amenities: 1
      }
    },
    {
      $limit: 20
    }
  ]).toArray()
  res.json(data)
}