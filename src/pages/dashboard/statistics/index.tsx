import axios from "axios";
import React, { useEffect, useState } from "react";

interface Record {
  interance: string;
  time: Date;
}

const Statistics = () => {
  const [records, setRecords] = useState<Record[]>();
  useEffect(() => {
    axios
      .get("/api/restaurants/get-views")
      .then((res) => setRecords(res.data))
      .catch((e) => console.log(e));
  }, []);
  console.log(records);
  return <div>Statistics</div>;
};

export default Statistics;
