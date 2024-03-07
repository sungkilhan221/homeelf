import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import moment from "moment";
import Link from "next/link";

function BookingHistoryList({ bookingHistory, type }) {
  const cancelAppointment = (booking) => {
    GlobalApi.deleteBooking(booking.id).then(
      (resp) => {
        if (resp) {
          toast("Booking Delete Successfully!");
        }
      },
      (e) => {
        toast("Error while canceling booking!");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {bookingHistory.map(
        (booking, index) =>
          booking?.businessList?.name && (
            <div className="border rounded-lg p-4 mb-5">
              <div key={index} className="flex gap-4">
                <Link href={`/details/${booking.businessList.id}`}>
                  <Image
                    src={booking?.businessList?.images[0]?.url}
                    alt="image"
                    width={120}
                    height={120}
                    className="rounded-lg object-cover aspect-square cursor-pointer"
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold">{booking.businessList.name}</h2>
                    <p className="text-xs bg-primary text-white p-1 px-2 rounded-lg">
                      {booking.bookingStatus}
                    </p>
                  </div>
                  <h2 className="flex gap-2 text-primary">
                    {" "}
                    <User /> {booking.businessList.contactPerson}
                  </h2>
                  <h2 className="flex gap-2 text-gray-500">
                    {" "}
                    <MapPin className="text-primary" />{" "}
                    {booking.businessList.address}
                  </h2>
                  <h2 className="flex gap-2 text-gray-500">
                    <Calendar className="text-primary" />
                    Service on :{" "}
                    <span className="text-black">
                      {moment(booking.date).format("MMM DD, yyyy")}
                    </span>
                  </h2>
                  <h2 className="flex gap-2 text-gray-500">
                    <Clock className="text-primary" />
                    Service on :{" "}
                    <span className="text-black"> {booking.time}</span>
                  </h2>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default BookingHistoryList;
