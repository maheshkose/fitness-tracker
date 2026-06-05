
import AddBodyMetric from '@/Components/MyComponents/Bodymetrics/AddBodyMetric';
import { useAppContext } from '@/Context/AppContext';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Metrics = () => {

  const {getAllBodyMetrics} = useAppContext();

  const [bodymetrics, setbodymetrics] = useState([]);
  console.log("bodymetrics",bodymetrics);
  

  const getAllBodyMetricsHandler = async ()=>{
    const res = await getAllBodyMetrics();
    if (res.data.success) {
      toast.success(res.data.message || "Body metrics fetched successfully");
      setbodymetrics(res.data.metrics);
    }else{
      toast.error(res.data.message || "Failed to fetch body metrics");
    }
  }
  //handle this useEffect also
  useEffect(() => {
    getAllBodyMetricsHandler();
  
  }, [bodymetrics.length]);
  
  return (
    <div>

      <h1>Metrics</h1>
      <AddBodyMetric getAllBodyMetricsHandler={getAllBodyMetricsHandler} />

      <div>
        {bodymetrics?.map((metric)=>{
          return (
            <div key={metric._id} className='border-2 border-amber-500'>
              <h2>{metric.type}</h2>
              <p>{metric.value} {metric.unit}</p>
              <p>{new Date(metric.recordedAt).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Metrics