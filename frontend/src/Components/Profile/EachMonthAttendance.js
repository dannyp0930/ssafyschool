import { useEffect, useState } from 'react';
import {PieChart} from 'react-minimal-pie-chart'
import holidays from './holidays';

export default function EachMonthAttendance({ checkInList, checkOutList }) {
  const [ today, setToday ] = useState({year: 0, month:0, date: 0})
  const [ weekdays, setWeekdays ] = useState(30);
  const [ chartdata, setChartdata ] = useState(null);
  const [ attendance, setAttendance ] = useState(0);
  const [ tardy, setTardy ] = useState(0);
  // const [ checkInList, setCheckInList ] = useState([]);
  // const [ checkOutList, setCheckOutList ] = useState([]);

  // useEffect(() => {
  //   async function saveCheckIn() {
  //     const res = await apiInstance().get(`/users/check-indate`)
  //     setCheckInList(res.data.map(data => data.checkIndate))
  //   };
  
  //   async function saveCheckOut() {
  //     const res = await apiInstance().get(`/users/check-outdate`)
  //     setCheckOutList(res.data.map(data => data.checkOutDate))
  //   };

  //   saveCheckIn();
  //   saveCheckOut();
  // }, [])

  // 이번달 일 수 계산
  useEffect(() => {
    const todayInfo = new Date();
    const newToday = {
      year: todayInfo.getFullYear(), 
      month: todayInfo.getMonth() + 1, 
      date: todayInfo.getDate()
    }
    setToday(newToday)

    const lastDate = (new Date(newToday.year, newToday.month, 0)).getDate();
    let count = 0;
    for (let date = 1; date <= lastDate; date++) {
      const temp = new Date(newToday.year, newToday.month - 1, date);
      const tempDay = temp.getDay();
      const tempDate = temp.getDate();
      if (tempDay !== 0 && tempDay !== 6) {
        if (!(holidays[newToday.year][newToday.month].includes(tempDate))) {
          count += 1
        }
      }
    }
    setWeekdays(count)
  }, [])

  // 출석수 계산
  useEffect(() => {
    let presents = 0
    let tardys = 0
    
    for (let i = 0; i < checkOutList.length; i ++) {
      if (parseInt(checkOutList[i].slice(5, 7)) === today.month){
        if (checkInList.includes(checkOutList[i])) {
          presents++
        } else {
          tardys++
        }
      }
    }
    presents -= Math.floor(tardys / 3)
    setAttendance(presents);
    setTardy(tardys);
    setChartdata([{title:'',value: presents,color:'#F6CB44'}])
  }, [checkInList, checkOutList, today])
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "400px",
      width: "300px",
      margin: "auto",
    }}>
      <h1 style={{
        display: "inline-block",
        margin: "1rem auto 0 1rem"}}
      >
        {today.month}월 출석
      </h1>
      {chartdata&&<PieChart
        data={chartdata}
        reveal={parseInt((attendance * 100) / weekdays)}
        lineWidth={10}
        label={() => `${Math.round(attendance / weekdays * 100)}%`}
        background='#f3f3f3'
        rounded
        animate
        labelPosition={0}
      />}
      <h2 style={{display: "inline-block", marginTop: "0.5rem"}}>싸피 지원금 {parseInt(1000000 * attendance / weekdays).toLocaleString("ko-KR")}원</h2>
      <p>지각/조퇴/외출 : {tardy}</p>
    </div>
  );
}