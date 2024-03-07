"use client";

import GlobalApi from "../../../_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";
import BusinessDescription from "../_components/BusinessDescription";

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    params && getBusinessId();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getBusinessId = () => {
    GlobalApi.getBusinessById(params.businessId).then((res) => {
      setBusiness(res.businessList);
    });
  };

  const checkUserAuth = () => {
    if (status === "loading") return <div>Loading...</div>;

    if (status === "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status === "authenticated" &&
    business && (
      <div className="py-8 md:py-20 px-10 md:px-5">
        <BusinessInfo business={business} />

        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-4 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div className="hidden md:block">
            <SuggestedBusinessList business={business} />
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail;
