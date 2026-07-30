import { BookingService } from "../../../src/modules/bookings/booking.service";
import { BookingRepository } from "../../../src/modules/bookings/booking.repository";

describe("BookingService", () => {
  const mockBooking = {
    id: 1,
    customer_id: 10,
    shop_id: 20,
    barber_id: 30,
    booking_slot_id: 40,
    status: "confirmed" as const,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockBookingDetails = {
    ...mockBooking,
    customer_name: "Baraa",
    customer_phone: "0599999999",
    barber_name: "Ahmad",
    shop_name: "Best Barber",
    start_time: new Date(),
    end_time: new Date(),
  };

  beforeEach(() => {
    spyOn(BookingRepository, "create").and.returnValue(
      Promise.resolve(mockBooking),
    );

    spyOn(BookingRepository, "getAll").and.returnValue(
      Promise.resolve([mockBookingDetails]),
    );

    spyOn(BookingRepository, "getById").and.returnValue(
      Promise.resolve(mockBookingDetails),
    );

    spyOn(BookingRepository, "getByCustomerId").and.returnValue(
      Promise.resolve([mockBookingDetails]),
    );

    spyOn(BookingRepository, "getByBarberId").and.returnValue(
      Promise.resolve([mockBookingDetails]),
    );

    spyOn(BookingRepository, "update").and.returnValue(
      Promise.resolve(mockBooking),
    );

    spyOn(BookingRepository, "deleteById").and.returnValue(
      Promise.resolve(mockBooking),
    );
  });

  it("should create booking", async () => {
    const result = await BookingService.create({
      customer_id: 10,
      shop_id: 20,
      barber_id: 30,
      booking_slot_id: 40,
    });

    expect(result.id).toBe(1);

    expect(BookingRepository.create).toHaveBeenCalled();
  });

  it("should get all bookings", async () => {
    const result = await BookingService.getAll();

    expect(result.length).toBe(1);

    expect(result[0]?.customer_name).toBe("Baraa");
  });

  it("should get booking by id", async () => {
    const result = await BookingService.getById(1);

    expect(result?.id).toBe(1);
  });

  it("should get bookings by customer", async () => {
    const result = await BookingService.getByCustomerId(10);

    expect(result.length).toBe(1);
  });

  it("should get bookings by barber", async () => {
    const result = await BookingService.getByBarberId(30);

    expect(result.length).toBe(1);
  });

  it("should update booking", async () => {
    const result = await BookingService.update(1, {
      status: "cancelled",
    });

    expect(result?.status).toBe("confirmed");

    expect(BookingRepository.update).toHaveBeenCalled();
  });

  it("should delete booking", async () => {
    const result = await BookingService.deleteById(1);

    expect(result?.id).toBe(1);

    expect(BookingRepository.deleteById).toHaveBeenCalled();
  });
});
