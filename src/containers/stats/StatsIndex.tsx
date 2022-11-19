// import Chart from "../../components/Chart"
import { BaseService } from "../../services/base-service"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { IStatsPostData } from "../../dto/IStatsPostData"
import React from "react";
import Delayed from '../../components/Delayed'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const StatsIndex = () => {

  let startData = [
    {
      name: "Vitamin E",
      personRecommendedUpperIntakeLevels: 0,
      consumedNutrients: 36,
      amt: 100
    },
    {
      name: "Vitamin B1",
      personRecommendedUpperIntakeLevels: 0,
      consumedNutrients: 56,
      amt: 100
    },
    {
      name: "Vitamin C",
      personRecommendedUpperIntakeLevels: 0,
      consumedNutrients: 20,
      amt: 100
    },
  ]

  let recommended: number[] = [0,0,0];

  useEffect(() => {
    getStats()
  }, [])

  const [stats, setstats] = useState({})
  const [recs, setrecs] = useState([0,0,0])
  const [uppers, setuppers] = useState([0,0,0])
  const [today, settoday] = useState([0,0,0])
  const [fooditems, setfooditems] = useState({})

  const appState = useContext(AppContext);
  const credentials = appState.jwt;

  const getStats = async () => {
    // /api/v{version}/Recipes/registermeal/{id}
    const postData: IStatsPostData = {
      "id": appState.userId,
      "time": (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1)
    }
    // "time": new Date().toISOString()
    console.log("WHAT AM I SENDING?")
    console.log(postData, "https://localhost:5001/api/v.1/stats/" + appState.userId, credentials!)
    let result = await BaseService.postForStats(postData, "https://localhost:5001/api/v.1/stats/" + appState.userId, credentials!)
    console.log('stats received')
    console.log(result)
    //console.log(result.data.consumedNutrients["Vitamin E"])
    let v1 = parseInt((result.data.consumedNutrients["Vitamin E"]/result.data.personRecommendedUpperIntakeLevels["Vitamin E"]*100).toFixed(2))
    let v2 = parseInt((result.data.consumedNutrients["Vitamin B1"]/result.data.personRecommendedUpperIntakeLevels["Vitamin B1"]*100).toFixed(2))
    let v3 = parseInt((result.data.consumedNutrients["Vitamin C"]/result.data.personRecommendedUpperIntakeLevels["Vitamin C"]*100).toFixed(2))
    startData[0].consumedNutrients = v1 > 0 ? v1 : 0
    startData[1].consumedNutrients = v2 > 0 ? v2 : 0
    startData[2].consumedNutrients = v3 > 0 ? v3 : 0

    startData[0].personRecommendedUpperIntakeLevels = (100 - startData[0].consumedNutrients) > 0 ? 100 - startData[0].consumedNutrients : 0
    startData[1].personRecommendedUpperIntakeLevels = (100 - startData[1].consumedNutrients) > 0 ? 100 - startData[1].consumedNutrients : 0
    startData[2].personRecommendedUpperIntakeLevels = (100 - startData[2].consumedNutrients)> 0 ? 100 - startData[2].consumedNutrients : 0

    // recommended.push(result.data.personRecommendedUpperIntakeLevels["Vitamin E"]);
    // recommended.push(result.data.personRecommendedUpperIntakeLevels["Vitamin B1"]);
    // recommended.push(result.data.personRecommendedUpperIntakeLevels["Vitamin C"]);
    let recsarr:number[] = []

    recsarr[0] = result.data.personRecommendedUpperIntakeLevels["Vitamin E"];
    recsarr[1] = result.data.personRecommendedUpperIntakeLevels["Vitamin B1"];
    recsarr[2] = result.data.personRecommendedUpperIntakeLevels["Vitamin C"];

    let uppersarr:number[] = []
    uppersarr[0] = result.data.tolerableUpperIntakeLevels["Vitamin E"];
    uppersarr[1] = result.data.tolerableUpperIntakeLevels["Vitamin B1"];
    uppersarr[2] = result.data.tolerableUpperIntakeLevels["Vitamin C"];

    let todayarr:number[] = []
    todayarr[0] = result.data.consumedNutrients["Vitamin E"] ? result.data.consumedNutrients["Vitamin E"] : 0;
    todayarr[1] = result.data.consumedNutrients["Vitamin B1"] ? result.data.consumedNutrients["Vitamin B1"] : 0;
    todayarr[2] = result.data.consumedNutrients["Vitamin C"] ? result.data.consumedNutrients["Vitamin C"] : 0;

  

    setstats(startData)
    setrecs(recsarr)
    setuppers(uppersarr)
    settoday(todayarr)
    setfooditems(result.data.consumedFoodItems)
    console.log(result.data.consumedFoodItems)
}
    


  return (
      <>
      <h1>Your personal nutrition statistics</h1>
      <div>Daily nutrient intake (%)</div>
      <Delayed>
        <Chart data={stats}/>
        <Table recommended={recs} uppers={uppers} today={today} fooditems={fooditems}/>
      </Delayed>

      </>
  );
}

export default StatsIndex;

const Chart = (props:any) => {

  return (
    <ResponsiveContainer width="82%" height={500} >
    <BarChart
      width={900}
      height={500}
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="consumedNutrients" name="consumed" stackId="a" fill="#82ca9d" />
      <Bar dataKey="personRecommendedUpperIntakeLevels" name="remaining"  stackId="a" fill="#8884d8" />
    </BarChart></ResponsiveContainer>
  );
}

const mockData = {
  "tolerableUpperIntakeLevels": {
      "Vitamin E": 300,
      "Vitamin B1": 99999,
      "Vitamin C": 10000
  },
  "personRecommendedUpperIntakeLevels": {
      "Vitamin E": 10,
      "Vitamin B1": 1.5,
      "Vitamin C": 100
  },
  "consumedFoodItems": {},
  "consumedNutrients": {
    "Vitamin E": 10,
    "Vitamin B1": 1.5,
    "Vitamin C": 100
  }
}

const Table = (props:any) => {
  return (
    <>
    <h5>Daily nutrient intake</h5>
<table className="table">
<thead>
<tr>
    <td>
        Nutrient: 
    </td>
        <th>
            Vitamin E (mg)
            
        </th>
        <th>
            Vitamin B1 (mg)
            
        </th>
        <th>
            Vitamin C (mg)
            
        </th>
</tr>

<tr>
                <td>
                    Recommended Intake level:  
                </td>
        <td className="recommended">
         {props.recommended[0]}
        {/* {stats[0].personRecommendedUpperIntakeLevels["Vitamin E"]} */}
        </td>
        <td className="recommended">
        {props.recommended[1]}
        {/* {stats[1].personRecommendedUpperIntakeLevels["Vitamin B1"]} */}
        </td>
        <td className="recommended">
        {props.recommended[2]}
        {/* {stats[2].personRecommendedUpperIntakeLevels["Vitamin C"]} */}
        </td>
</tr>
<tr>
                    <td >
                        Consumed today:
                    </td>
                    <td className="today">
                    {props.today[0].toFixed(2)}
                    </td>
                    <td className="today">
                    {props.today[1].toFixed(2)}
                    </td>
                    <td className="today">
                    {props.today[2].toFixed(2)}
                    </td>
</tr>

    <tr>
            <td>
                Tolerable Upper intake level: 
            </td>
            <td className="dangerous">
            {props.uppers[0]}
            </td>
            <td className="dangerous">
            {/* {props.uppers[1]} */} N/A
            </td>
            <td className="dangerous">
            {props.uppers[2]}
            </td>
    </tr>
    <tr>
                    <td >
                        Daily status:
                    </td>
                    <td className="status">
                    {(props.today[0]/props.recommended[0]*100).toFixed()}%
                    </td>
                    <td className="status">
                    {(props.today[1]/props.recommended[1]*100).toFixed()}%
                    </td>
                    <td className="status">
                    {(props.today[2]/props.recommended[2]*100).toFixed()}%
                    </td>
</tr>
</thead>
<tbody>

</tbody>
</table>
{/* </ br>
</ hr>

<hr>
</ br > */}

<h5>Consumed fooditems</h5>
<table className="table">
   <thead>
      <tr>
         <th>
            Fooditem
         </th>
         <th>
            Quantity (g)
         </th>
      </tr>
   </thead>
   <tbody>
     {Object.entries(props.fooditems).map(item => (
     <tr>
         <td>
            {" "}
           {item[0]}
         </td>
         <td>
            {" "}
            {item[1]}
         </td>
      </tr>
      )
      )
      }
      </tbody>
</table>


    </>
  )
}