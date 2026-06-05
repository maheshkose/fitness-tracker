import { useAppContext } from '@/Context/AppContext';
import React, { useState } from 'react'
import { toast } from 'sonner';


const METRIC_TYPES = [
  "weight",
  "height",
  "bodyFat",

  "chest",
  "waist",
  "hips",
  "arms",
  "forearms",
  "thighs",
  "calves",
  "neck",
  "shoulders",

  "bloodPressureSystolic",
  "bloodPressureDiastolic",
  "heartRate",
  "restingHeartRate",
  "bloodSugar",
  "fastingBloodSugar",
  "oxygenSaturation"
];

// ✅ UNIT MAPPING
const UNIT_MAP = {
  weight: ["kg", "lbs"],
  height: ["cm", "inch", "ft"],

  bodyFat: ["%"],

  chest: ["cm", "inch"],
  waist: ["cm", "inch"],
  hips: ["cm", "inch"],
  arms: ["cm", "inch"],
  forearms: ["cm", "inch"],
  thighs: ["cm", "inch"],
  calves: ["cm", "inch"],
  neck: ["cm", "inch"],
  shoulders: ["cm", "inch"],

  bloodPressureSystolic: ["mmHg"],
  bloodPressureDiastolic: ["mmHg"],

  heartRate: ["bpm"],
  restingHeartRate: ["bpm"],

  bloodSugar: ["mg/dL"],
  fastingBloodSugar: ["mg/dL"],

  oxygenSaturation: ["%"]
};

// ✅ CATEGORY (for UI grouping)
const CATEGORY_MAP = {
  weight: "body",
  height: "body",
  bodyFat: "body",

  chest: "girth",
  waist: "girth",
  hips: "girth",
  arms: "girth",
  forearms: "girth",
  thighs: "girth",
  calves: "girth",
  neck: "girth",
  shoulders: "girth",

  bloodPressureSystolic: "health",
  bloodPressureDiastolic: "health",
  heartRate: "health",
  restingHeartRate: "health",
  bloodSugar: "health",
  fastingBloodSugar: "health",
  oxygenSaturation: "health"
};

const AddBodyMetric = ({getAllBodyMetricsHandler}) => {
    const { addBodyMetric } = useAppContext();
    const [data, setdata] = useState({
        type: 'weight',
        value: 0,
        unit: 'kg',
        recordedAt: ''
    });
    console.log("add body Metric data",data);
    
    const handleChange = (e) => {
        setdata({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        const res = await addBodyMetric(data);
        if(res.data.success){
            toast.success(res.data.message || "Body metric added successfully");
            setdata({
                type: '',
                value: 0,
                unit: '',
                recordedAt: ''
            });
            getAllBodyMetricsHandler();
        }else{
            toast.error(res.data.message || "Failed to add body metric");
        }
    }
  return (
    <form>
        <div>
            <h1>Add Body Metric</h1>
        </div>
        {/* //fix select bug selecting value must chanage  */}
        <div>
            <label>Type</label>
            <select name="type" id="" onChange={handleChange} required>
                <option value="" disabled={true}>Select metric type</option>
                {
                    METRIC_TYPES.map((type) => (
                        <option value={type} key={type}>{type}</option>
                    ))
                }
            </select>
        </div>
        <div>
            <label>Value</label>
            <input type="number" value={data.value} name='value' onChange={handleChange} required />
        </div>
        <div>
            <label>Unit</label>
            <select name="unit" id="" onChange={handleChange} required>
                <option value="" disabled={true}>Select unit</option>
                {
                    UNIT_MAP[data.type] ? UNIT_MAP[data.type].map((unit) => (
                        <option value={unit} key={unit}>{unit}</option>
                    )):null
                }
                
            </select>
        </div>
        <div>
            <label>Recorded At</label>
            <input type="datetime-local" value={data.recordedAt} name='recordedAt' onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit}>Add Body Metric</button>
    </form>
  )
}

export default AddBodyMetric