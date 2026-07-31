import { BookingService } from "../../../src/modules/bookings/booking.service";
import { BookingRepository } from "../../../src/modules/bookings/booking.repository";

describe("BookingService", () => {
  beforeEach(() => {
    spyOn(BookingRepository, "create");
    spyOn(BookingRepository, "getAll");
    spyOn(BookingRepository, "getById");
    spyOn(BookingRepository, "getByCustomerId");
    spyOn(BookingRepository, "getByBarberId");
    spyOn(BookingRepository, "update");
    spyOn(BookingRepository, "deleteById");
  });

  it("should create booking", async () => {
    const booking = {
      id: 1,
      customer_id: 10,
      slot_id: 20,
      status: "confirmed" as const,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (BookingRepository.create as jasmine.Spy).and.resolveTo(booking);

    const result = await BookingService.create({
      customer_id: 10,
      slot_id: 20,
    });

    expect(BookingRepository.create).toHaveBeenCalledWith({
      customer_id: 10,
      slot_id: 20,
    });

    expect(result).toEqual(booking);
  });

  it("should get all bookings", async () => {
    const bookings: any[] = [];

    (BookingRepository.getAll as jasmine.Spy).and.resolveTo(bookings);

    const result = await BookingService.getAll();

    expect(BookingRepository.getAll).toHaveBeenCalled();

    expect(result).toEqual(bookings);
  });

  it("should get booking by id", async () => {
    const booking: any = {
      id: 1,
      customer_id: 10,
      slot_id: 20,
      status: "confirmed",
    };

    (BookingRepository.getById as jasmine.Spy).and.resolveTo(booking);

    const result = await BookingService.getById(1);

    expect(BookingRepository.getById).toHaveBeenCalledWith(1);

    expect(result).toEqual(booking);
  });

  it("should get bookings by customer id", async () => {
    const bookings: any[] = [];

    (BookingRepository.getByCustomerId as jasmine.Spy).and.resolveTo(bookings);

    const result = await BookingService.getByCustomerId(10);

    expect(BookingRepository.getByCustomerId).toHaveBeenCalledWith(10);

    expect(result).toEqual(bookings);
  });

  it("should get bookings by barber id", async () => {
    const bookings: any[] = [];

    (BookingRepository.getByBarberId as jasmine.Spy).and.resolveTo(bookings);

    const result = await BookingService.getByBarberId(5);

    expect(BookingRepository.getByBarberId).toHaveBeenCalledWith(5);

    expect(result).toEqual(bookings);
  });

  it("should update booking status", async () => {
    const updated: any = {
      id: 1,
      status: "cancelled",
    };

    (BookingRepository.update as jasmine.Spy).and.resolveTo(updated);

    const result = await BookingService.update(1, {
      status: "cancelled",
    });

    expect(BookingRepository.update).toHaveBeenCalledWith(1, {
      status: "cancelled",
    });

    expect(result).toEqual(updated);
  });

  it("should delete booking", async () => {
    const deleted: any = {
      id: 1,
    };

    (BookingRepository.deleteById as jasmine.Spy).and.resolveTo(deleted);

    const result = await BookingService.deleteById(1);

    expect(BookingRepository.deleteById).toHaveBeenCalledWith(1);

    expect(result).toEqual(deleted);
  });
});
