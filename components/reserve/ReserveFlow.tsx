"use client";

import { useState } from "react";
import { initiateReservation } from "@/lib/api";
import type { ReserveResponse } from "@/lib/api";
import type { ReservationFormValues } from "@/lib/validations/lead";
import {
  ReservationForm,
  ReservationPaymentShell,
  ReservationSuccessState,
  ReservationErrorState,
} from "@/components/reserve";

type ReserveFlowProps = {
  vehicleId: string;
  className?: string;
};

type FlowState = "form" | "submitting" | "success" | "error";

export function ReserveFlow({ vehicleId, className }: ReserveFlowProps) {
  const [state, setState] = useState<FlowState>("form");
  const [reservation, setReservation] = useState<ReserveResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (values: ReservationFormValues) => {
    setState("submitting");
    setErrorMessage("");
    try {
      const res = await initiateReservation({
        vehicleId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      });
      setReservation(res);
      setState("success");
    } catch {
      setState("error");
      setErrorMessage("We couldn't complete your reservation. Please try again or contact us.");
    }
  };

  const handleRetry = () => {
    setState("form");
    setErrorMessage("");
  };

  if (state === "success") {
    return (
      <div className={className}>
        <ReservationSuccessState vehicleId={vehicleId} className="mb-8" />
        <ReservationPaymentShell status="reserved" reservation={reservation} />
      </div>
    );
  }

  if (state === "error") {
    return (
      <ReservationErrorState
        message={errorMessage}
        onRetry={handleRetry}
        vehicleId={vehicleId}
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <ReservationForm
        vehicleId={vehicleId}
        onSubmit={handleSubmit}
        loading={state === "submitting"}
        className="mb-8"
      />
      <ReservationPaymentShell status="pending" />
    </div>
  );
}
