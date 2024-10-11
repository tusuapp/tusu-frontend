import React, {PureComponent, useEffect, useState} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts";
import SimpleSlider from "./Slider/slider";
import moment from "moment";

/*
const data = [
    {
        day: "Sun",
        pv: 2400,
        vp: 1200,
        amt: 2400,
    },
    {
        day: "Mon",
        pv: 1398,
        vp: 1200,
        amt: 2210,
    },
    {
        day: "Tue",
        pv: 9800,
        vp: 1200,
        amt: 2290,
    },
    {
        day: "Wed",
        pv: 3908,
        vp: 1200,
        amt: 2000,
    },
    {
        day: "Thu",
        pv: 4800,
        vp: 1200,
        amt: 2181,
    },
    {
        day: "Fri",
        pv: 3800,
        vp: 1200,
        amt: 2500,
    },
    {
        day: "Sat",
        pv: 4300,
        vp: 1200,
        amt: 2100,
    },
];
*/

interface IData {
    chartData: Array<any>,
    total: number,
    help: Object
}

interface IEarningsChart {
    data: IData;
    filter: string;
}

const EarningsChart: React.FC<IEarningsChart> = ({data: {chartData}, filter}) => {
    const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const [data, setData] = useState([])
    useEffect(() => {
        let cdata: Array<any> = []
        if (chartData && chartData.length)
            chartData.forEach((dd) => {
                let x = dd.xaxis
                if (filter == "all") {
                    x = moment(x).format("YYYY-MM-DD")
                }
                if (filter == "week") {
                    let zz = x.split("-")
                    x = daysOfWeek[zz[0]] + "-" + months[zz[1] - 1] + "-" + zz[2]
                }
                if (filter == "month") {
                    let zz = x.split("-")
                    x = months[zz[0] - 1] + "-" + zz[1]
                }

                cdata.push({amount: dd.amount, bookings: dd.cnt, XAxis: x})
            })

        // @ts-ignore
        setData(cdata)
    }, [chartData])

    return (
        <div>
            <div className="earnings-chart__wrapper">
                <div className="py-5 text-center">
                    {/*<SimpleSlider/>*/}
                </div>
                <div style={{height: "500px"}}>
                    <ResponsiveContainer width="90%" height="80%">
                        <LineChart
                            width={100}
                            height={100}
                            data={data}
                            margin={{
                                top: 20,
                                right: 50,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="XAxis"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="amount" stroke="#82ca9d"/>
                            <Line type="monotone" dataKey="bookings" stroke="#82ca9d"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EarningsChart;
