"use client"

import { TrendingUp, Weight } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    // type ChartConfig,
} from "@/Components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { useState } from "react"


export const description = "A simple area chart"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]


//  satisfies ChartConfig

export function ChartAreaDefault() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Area Chart</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}


export function MetricAreaChart({ chartData, chartMetricType }) {
    const chartConfig = {
    value: {
        label: chartMetricType,
        color: "var(--chart-1)",
    },
    unit:{
        label: "unit",
        color: "var(--chart-1)",
    }
}
    const [timeRange, setTimeRange] = useState("90d")
//   const filteredData = chartData.filter((item) => {
//     const date = new Date(item.date)
//     const referenceDate = new Date("2024-06-30")
//     let daysToSubtract = 90
//     if (timeRange === "30d") {
//       daysToSubtract = 30
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7
//     }
//     const startDate = new Date(referenceDate)
//     startDate.setDate(startDate.getDate() - daysToSubtract)
//     return date >= startDate
//   })

    const formattedData = chartData.map((item) => {
        const rawDate = new Date(item.recordedAt);

        return {
            rawDate,
            date: rawDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
            }),
            value: item.value,
            unit: item.unit,
        };
    });

    const filteredData = formattedData.filter((item) => {
        if (timeRange === "All") {
            return true;
        }
        const refDate = new Date();
        let daysToSubtract = 90;

        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }

        const startDate = new Date(refDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);

        return item.rawDate >= startDate;
    });

    
    
    console.log("filteredData",filteredData);
    

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{chartMetricType} Chart</CardTitle>
                    <CardDescription>
                        Showing total {chartMetricType.toLowerCase()} for the last 6 months
                    </CardDescription>
                </CardHeader>
                <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">

            <SelectItem value="All" className="rounded-lg">
              All
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
  
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={filteredData}
                            margin={{
                                left: 20,
                                right: 12,
                                top: 12,
                                bottom: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 6)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                                dataKey="value"
                                type="natural"
                                // fill="var(--color-desktop)"
                                fill="red"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                            />
                        </AreaChart>

                    </ChartContainer>

                </CardContent>
                <CardFooter></CardFooter>

            </Card>
        </>
    );
}

export function StrengthProgressAreaCharts({chartData, chartMetricType}){
     const chartConfig = {
    value: {
        label: chartMetricType,
        color: "var(--chart-1)",
    },
    unit:{
        label: "unit",
        color: "var(--chart-1)",
    }

}

const exampleChartData = [
    {
        date: 'jul,1,2026',
        weight1: 60,
        reps1: 10,
        unit1: 'kg',
        weight2: 70,
        reps2: 8,
        unit2: 'kg',
    },
    {
        date: 'jul,7,2026',
        weight1: 90,
        reps1: 10,
        unit1: 'kg',
        weight2: 100,
        reps2: 8,
        unit2: 'kg',
    },
    {
        date: 'jul,15,2026',
        weight1: 90,
        reps1: 10,
        unit1: 'kg',
        weight2: 100,
        reps2: 8,
        unit2: 'kg',
    },
    {
        date: 'jul,22,2026',
        weight1: 90,
        reps1: 10,
        unit1: 'kg',
        weight2: 100,
        reps2: 8,
        unit2: 'kg',
    }
    
   
    

    
]
const exampleChartData2 = [
    {
        date: 'jul,1,2026',
        set1: {weight: 60, reps: 10, unit: 'kg'},
        set2: {weight: 70, reps: 8, unit: 'kg'},
    },
    {
        date: 'jul,7,2026',
        set1: {weight: 90, reps: 10, unit: 'kg'},
        set2: {weight: 100, reps: 8, unit: 'kg'},
    },
    {
        date: 'jul,15,2026',
        set1: {weight: 90, reps: 10, unit: 'kg'},
        set2: {weight: 100, reps: 8, unit: 'kg'},
    },
    {
        date: 'jul,22,2026',    
    set1: {weight: 90, reps: 10, unit: 'kg'},
    set2: {weight: 100, reps: 8, unit: 'kg'},
    }
]
const exampleChartData3 = [
    {
        date: 'jul,1,2026',
        sets:[
            {weight: 60, reps: 10, unit: 'kg'},
            {weight: 70, reps: 8, unit: 'kg'},
            {weight: 80, reps: 6, unit: 'kg'}
        ]
    },
    {
        date: 'jul,7,2026',
        sets:[
            {weight: 90, reps: 10, unit: 'kg'},
            {weight: 100, reps: 8, unit: 'kg'},
            {weight: 110, reps: 6, unit: 'kg'}
        ]
    },
    {
        date: 'jul,15,2026',
        sets:[
            {weight: 90, reps: 10, unit: 'kg'},
            {weight: 100, reps: 8, unit: 'kg'},
            {weight: 110, reps: 6, unit: 'kg'}
        ]
    }
]

const sourceData = chartData.length > 0 ? chartData : exampleChartData3

const flattenedData = sourceData.map((entry) => {
    const setValues = (entry.sets || []).reduce((acc, set, index) => {
        acc[`set${index + 1}`] = set.weight
        return acc
    }, {})

    return {
        ...entry,
        ...setValues,
    }
})

const maxSets = sourceData.reduce((max, entry) => {
    return Math.max(max, (entry.sets || []).length)
}, 0)

const areaColors = [
    'var(--color-desktop)',
    'var(--color-accent)',
    'var(--color-foreground)',
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-destructive)',
]

const areaSeries = Array.from({ length: maxSets }, (_, index) => {
    const color = areaColors[index % areaColors.length]
    return (
        <Area
            key={`set${index + 1}`}
            dataKey={`set${index + 1}`}
            name={`Set ${index + 1}`}
            type="natural"
            fill={color}
            fillOpacity={0.4}
            stroke={color}
        />
    )
})
    return (
        <Card>
            <CardHeader>
                <CardTitle>strength progress Chart</CardTitle>
                <CardDescription>
                    Showing strength progress for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={exampleChartData2}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 5)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            // dataKey="weight1"
                            dataKey="set2.weight"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                         <Area
                            dataKey="set1.weight"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )

    //  return (
    //     <Card>
    //         <CardHeader>
    //             <CardTitle>strength progress Chart</CardTitle>
    //             <CardDescription>
    //                 Showing strength progress for the last 6 months
    //             </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //             <ChartContainer config={chartConfig}>
    //                 <AreaChart
    //                     accessibilityLayer
    //                     data={flattenedData}
    //                     margin={{
    //                         left: 12,
    //                         right: 12,
    //                     }}
    //                 >
    //                     <CartesianGrid vertical={false} />
    //                     <XAxis
    //                         dataKey="date"
    //                         tickLine={false}
    //                         axisLine={false}
    //                         tickMargin={8}
    //                         tickFormatter={(value) => value.slice(0, 5)}
    //                     />
    //                     <ChartTooltip
    //                         cursor={false}
    //                         content={<ChartTooltipContent indicator="line" />}
    //                     />

    //                     {areaSeries}
                    
    //                 </AreaChart>
    //             </ChartContainer>
    //         </CardContent>
    //         <CardFooter>
    //             <div className="flex w-full items-start gap-2 text-sm">
    //                 <div className="grid gap-2">
    //                     <div className="flex items-center gap-2 leading-none font-medium">
    //                         Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    //                     </div>
    //                     <div className="flex items-center gap-2 leading-none text-muted-foreground">
    //                         January - June 2024
    //                     </div>
    //                 </div>
    //             </div>
    //         </CardFooter>
    //     </Card>
    // )
}