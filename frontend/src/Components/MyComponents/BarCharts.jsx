
import { useState } from "react"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ComposedChart, Line } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
//    ChartConfig,
} from "@/Components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

export const description = "A stacked bar chart with a legend"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}
// } satisfies ChartConfig

export function ChartBarStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis axisLine={true} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}


const exampleChartData = [
  {
    date: "jul-01-2026",
    weight: 60,
    sets: [
      {
        weight: 60,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 50,
        whiteWeight: 10,
      },
      {
        weight: 80,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 66.67,
        whiteWeight: 13.33,
      },
      {
        weight: 100,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 83.33,
        whiteWeight: 16.67,
      },
    ],
  },

  {
    date: "jul-07-2026",
    weight: 60,
    sets: [
      {
        weight: 60,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 12,
        unit: "kg",
        blueWeight: 75,
        whiteWeight: 15,
      },
      {
        weight: 90,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 12,
        unit: "kg",
        blueWeight: 91.67,
        whiteWeight: 18.33,
      },
      {
        weight: 130,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 108.33,
        whiteWeight: 21.67,
      },
    ],
  },

  {
    date: "jul-15-2026",
    weight: 120,
    sets: [
      {
        weight: 120,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 100,
        whiteWeight: 20,
      },
      {
        weight: 140,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 116.67,
        whiteWeight: 23.33,
      },
      {
        weight: 160,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 133.33,
        whiteWeight: 26.67,
      },
    ],
  },

  {
    date: "jul-21-2026",
    weight: 150,
    sets: [
      {
        weight: 150,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 125,
        whiteWeight: 25,
      },
      {
        weight: 170,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 141.67,
        whiteWeight: 28.33,
      },
      {
        weight: 190,
        repRange: { minReps: 8, maxReps: 12 },
        reps: 10,
        unit: "kg",
        blueWeight: 158.33,
        whiteWeight: 31.67,
      },
    ],
  },
];

const strengthChartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
  date:{
    label: "Date",
    color: "var(--chart-3)",
  },
  weight:{
    label: "Weight",
      color: "var(--chart-3)",
    },
    reps:{
    label: "Reps",
    color: "var(--chart-3)",
  },
   maxReps:{
    label: "Max Reps",
    color: "var(--chart-3)",
  }
}
// } satisfies ChartConfig
 

export function StrengthBarChart({ exercise }) {

    const [setNumber, setSetNumber] = useState(0);
    function onSetNumberChange(newSetNumber) {
      if (newSetNumber < 0 || newSetNumber >= exercise.sets.length) {
        return;
      }
      setSetNumber(newSetNumber);
    }
    console.log(setNumber);

    const chartDataForSet = exercise.sets[setNumber].map((set) => ({
      date: set.date,
      weight: set.weight,
      reps: set.reps,
      maxReps: set.repRange.maxReps,
    }));

    return (
    <Card>
      <CardHeader>
        <CardTitle>Strength Progress <span className="font-bold text-orange-500">{exercise.exerciseName}</span></CardTitle>
        <CardDescription>January - June 2024</CardDescription>
        
      </CardHeader>

      <Select value={setNumber} onValueChange={(value)=>{onSetNumberChange(value)}}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Set Number" />
        </SelectTrigger>
        <SelectContent>
          {exercise.sets.map((set, index) => (
            <SelectItem key={index} value={index}>{`Set ${index + 1}`}</SelectItem>
          ))}
        
        </SelectContent>
      </Select>
      <CardContent>
        <ChartContainer config={strengthChartConfig}>
          <ComposedChart accessibilityLayer data={chartDataForSet}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis yAxisId="left" axisLine={true} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" axisLine={true} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent  />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="weight"
              yAxisId="left"
              fill="var(--color-primary)"
              radius={[0, 0, 4, 4]}
            />
            <Line
              type="monotone"
              dataKey="reps"
              yAxisId="right"
              stroke="yellow"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="maxReps"
              yAxisId="right"
              stroke="blue"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}