import { BookingSlotService } from "../../../src/modules/booking-slots/booking-slot.service";
import { BookingSlotRepository } from "../../../src/modules/booking-slots/booking-slot.repository";

describe("BookingSlotService", () => {
  const mockBookingSlot = {
    id: 1,
    barber_id: 5,
    slot_time: new Date("2026-07-30T10:00:00"),
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe("create", () => {
    it("should create booking slot", async () => {
      spyOn(BookingSlotRepository, "create").and.resolveTo(mockBookingSlot);

      const result = await BookingSlotService.create({
        barber_id: 5,
        slot_time: mockBookingSlot.slot_time,
      });

      expect(BookingSlotRepository.create).toHaveBeenCalled();

      expect(result.id).toBe(1);
    });
  });

  describe("getAll", () => {
    it("should return all booking slots", async () => {
      spyOn(BookingSlotRepository, "getAll").and.resolveTo([mockBookingSlot]);

      const result = await BookingSlotService.getAll();

      expect(BookingSlotRepository.getAll).toHaveBeenCalled();

      expect(result.length).toBe(1);
    });
  });

  describe("getById", () => {
    it("should return booking slot by id", async () => {
      spyOn(BookingSlotRepository, "getById").and.resolveTo(mockBookingSlot);

      const result = await BookingSlotService.getById(1);

      expect(BookingSlotRepository.getById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined when slot not found", async () => {
      spyOn(BookingSlotRepository, "getById").and.resolveTo(undefined);

      const result = await BookingSlotService.getById(99);

      expect(result).toBeUndefined();
    });
  });

  describe("getByBarberId", () => {
    it("should return slots by barber", async () => {
      spyOn(BookingSlotRepository, "getByBarberId").and.resolveTo([
        mockBookingSlot,
      ]);

      const result = await BookingSlotService.getByBarberId(5);

      expect(BookingSlotRepository.getByBarberId).toHaveBeenCalledWith(5);

      expect(result.length).toBe(1);
    });
  });

  describe("update", () => {
    it("should update booking slot", async () => {
      spyOn(BookingSlotRepository, "update").and.resolveTo(mockBookingSlot);

      const result = await BookingSlotService.update(1, {
        slot_time: new Date("2026-07-30T11:00:00"),
      });

      expect(BookingSlotRepository.update).toHaveBeenCalledWith(1, {
        slot_time: new Date("2026-07-30T11:00:00"),
      });

      expect(result?.id).toBe(1);
    });

    it("should return undefined when slot does not exist", async () => {
      spyOn(BookingSlotRepository, "update").and.resolveTo(undefined);

      const result = await BookingSlotService.update(99, {
        slot_time: new Date(),
      });

      expect(result).toBeUndefined();
    });
  });

  describe("deleteById", () => {
    it("should delete booking slot", async () => {
      spyOn(BookingSlotRepository, "deleteById").and.resolveTo(mockBookingSlot);

      const result = await BookingSlotService.deleteById(1);

      expect(BookingSlotRepository.deleteById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined when slot does not exist", async () => {
      spyOn(BookingSlotRepository, "deleteById").and.resolveTo(undefined);

      const result = await BookingSlotService.deleteById(99);

      expect(result).toBeUndefined();
    });
  });
});
