import Image from "next/image";
import React from "react";

function BusinessDescription({ business }) {
  return (
    business?.name && (
      <div>
        <h2 className="font-bold text-[25px]">Description</h2>
        <p className="mt-4 text-lg text-gray-600">{business?.about}</p>

        <h2 className="font-bold text-[25px] mt-8">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {business?.images.map((item, index) => (
            <Image
              key={index}
              src={item?.url}
              alt={business?.name}
              width={700}
              height={700}
              className="rounded-md object-cover aspect-square"
            />
          ))}
        </div>
      </div>
    )
  );
}

export default BusinessDescription;
