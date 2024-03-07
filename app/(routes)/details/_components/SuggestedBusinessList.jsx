import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import BookingSection from "./BookingSection";

function SuggestedBusinessList({ business }) {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    business && getBusinessList();
  }, [business]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(business?.category?.name).then((res) => {
      setBusinessList(res.businessLists);
    });
  };
  return (
    <div className="md:pl-10">
      <BookingSection business={business}>
        <Button className="flex gap-2 w-full">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2 className="font-bold text-lg mt-3 mb-3">Similar Business</h2>
        <div>
          {businessList &&
            businessList.map((business, index) => (
              <Link
                href={`/details/${business?.id}`}
                key={index}
                className="flex gap-2 mb-4 rounded-lg border-primary cursor-pointer items-center"
              >
                <Image
                  src={business?.images[0].url}
                  alt={business?.name}
                  width={90}
                  height={90}
                  className="rounded-lg object-cover aspect-square"
                />
                <div className="">
                  <h2 className="font-bold">{business?.name}</h2>
                  <h2 className="text-primary">{business?.contactPerson}</h2>
                  <h2 className="text-gray-400">{business?.address}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList;
