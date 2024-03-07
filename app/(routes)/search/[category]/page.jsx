"use client";

import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";

function BusinessByCategory({ params }) {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    params && getBusinessList();
  }, [params]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(params.category).then((res) => {
      setBusinessList(res.businessLists);
    });
  };

  return (
    <div>
      <BusinessList businessList={businessList} title={params.category} />
    </div>
  );
}

export default BusinessByCategory;
