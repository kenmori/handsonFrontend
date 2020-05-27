import React from "react";
import { normalize, schema } from "normalizr";
import { omit } from "lodash";
import "./styles.css";
// thank you https://json.okiba.me/
// "https://jsondata.okiba.me/v1/json/oGB0G200510001819"
// {
//   "id": "123",
//   "author": {
//     "id": "1",
//     "name": "Paul"
//   },
//   "title": "My awesome blog post",
//   "comments": [
//     {
//       "id": "324",
//       "commenter": {
//         "id": "2",
//         "name": "Nicole"
//       }
//     }
//   ]
// }

//to

// {
// 	"id": "123",
// 	"author": {
// 		"id": "1",
// 		"name": "Paul"
// 	},
// 	"title": "My awesome blog post",
// 	"comments": [
// 		{
// 			"id": "324",
// 			"commenter": {
// 				"id": "2",
// 				"name": "Nicole"
// 			}
// 		}
// 	]
// }

const api2 = "https://jsondata.okiba.me/v1/json/vY0LG200524003446";
export default function App() {
  const [stateData, setData] = React.useState([]);
  React.useEffect(() => {
    async function f() {
      const res = await fetch(api2);
      const data = await res.json();
      console.log("data", data);
      const units = new schema.Entity(
        "units",
        {},
        {
          idAttribute: (value, parent, key) => {
            // console.log(value, parent, key, "value");
            return parent.id;
          },
          processStrategy: value => {
            console.log(value);
            return {
              ...omit(value, ["__typename", "value"])
            };
          }
        }
      );
      const unitTypes = new schema.Entity(
        "units",
        {},
        {
          idAttribute: "fixedType",
          // mergeStrategy: (entityA, entityB) => {
          //   console.log("aaaaa", entityA, "bbbb",entityB);
          //   return entityA;
          // },
          processStrategy: value => {
            return {
              ...omit(value, ["__typename", "value", "fixedType"])
            };
          }
        }
      );
      const membersScheme = new schema.Entity(
        "members",
        {
          units: [units]
        },
        {
          processStrategy: (value, parent) => {
            console.log("value", value);
            return value;
          }
        }
      );
      const memberSchema = new schema.Entity("members", {
        members: {
          members: [membersScheme]
        }
      });
      const norData = normalize(data, memberSchema);
      console.log("norData", norData);
      // const unit = new schema.Entity("unit");

      // // const member = new schema.Entity("member");
      // const unitSchema = new schema.Object({ unit: new schema.Array(unit) });
      // // const memberSchema = new schema.Entity("member", { members: member });

      // // const normalizememberSchemaData = normalize(data, memberSchema);
      // const normalizeData = normalize(data, unitSchema);
      // console.log("normalizeData", normalizeData);

      // const data3 = {
      //   id_str: "123",
      //   url: "https://twitter.com",
      //   user: [{ id_str: "456", name: "Jimmy" }]
      // };

      // const user = new schema.Entity("users", {}, { idAttribute: "id_str" });
      // const tweet = new schema.Entity(
      //   "tweets",
      //   { user: [user] },
      //   {
      //     idAttribute: "id_str",
      //     // Apply everything from entityB over entityA, except for "favorites"
      //     mergeStrategy: (entityA, entityB) => {
      //       console.log("entityA", entityA, "entitiB", entityB);
      //       return {
      //         ...entityA,
      //         ...entityB,
      //         favorites: entityA.favorites
      //       };
      //     },
      //     // Remove the URL field from the entity
      //     processStrategy: entity => omit(entity, "url")
      //   }
      // );
      // console.log(2);
      // const normalizedData3 = normalize(data3, tweet);
      // console.log("normalizedData2", normalizedData3);
      setData(data);
    }
    f();
  }, []);
  return (
    <div className="App">
      <h1>API example with React</h1>
      <h2>
        <a href="https://kenjimorita.jp/aboutme">about me</a>
      </h2>
      {JSON.stringify(stateData)}
    </div>
  );
}
