"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_components/BookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";

function MyBooking() {
  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    data && GetUserBookingHistory();
  }, [data]);

  const GetUserBookingHistory = () => {
    GlobalApi.getUserBookingHistory(data?.user?.email).then((resp) => {
      console.log(resp);
      setBookingHistory(resp.bookings);
    });
  };

  const filterData = (type) => {
    const result = bookingHistory.filter((item) =>
      item?.bookingStatus === type ? item : null
    );

    return result;
  };

  return (
    <div className="my-10 mx-0 lg:mx-20">
      <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
      <Tabs defaultValue="Booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="Booked">Booked</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
          <TabsTrigger value="Canceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="Booked">
          <BookingHistoryList bookingHistory={filterData("Booked")} />
        </TabsContent>
        <TabsContent value="Completed">
          <BookingHistoryList bookingHistory={filterData("Completed")} />
        </TabsContent>
        <TabsContent value="Canceled">
          <BookingHistoryList bookingHistory={filterData("Canceled")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
