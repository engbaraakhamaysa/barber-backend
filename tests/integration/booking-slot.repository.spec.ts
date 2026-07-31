import { BookingSlotRepository } from "../../src/modules/booking-slots/booking-slot.repository";
import { createTestEnvironment } from "./helpers/test-data";
import { BarberRepository } from "../../src/modules/barbers/barber.repository";
import { ShopRepository } from "../../src/modules/shop/shop.repository";

describe("BookingSlotRepository Integration Tests", () => {
  let shopId: number;
  let barberId: number;
  let bookingSlotId: number;

  beforeAll(async () => {
    const env = await createTestEnvironment();

    shopId = env.shopId;
    barberId = env.barberId;
    bookingSlotId = env.bookingSlotId;
  });

  afterAll(async () => {
    await BookingSlotRepository.deleteById(bookingSlotId);

    await BarberRepository.deleteById(barberId);

    await ShopRepository.deleteById(shopId);
  });

  it("should get booking slot by id", async () => {
    const slot = await BookingSlotRepository.getById(bookingSlotId);

    expect(slot).toBeDefined();
    expect(slot?.id).toBe(bookingSlotId);
    expect(slot?.barber_id).toBe(barberId);
  });

  it("should get all booking slots", async () => {
    const slots = await BookingSlotRepository.getAll();

    expect(Array.isArray(slots)).toBeTrue();

    const slot = slots.find((item) => item.id === bookingSlotId);

    expect(slot).toBeDefined();
  });

  it("should get slots by barber", async () => {
    const slots = await BookingSlotRepository.getByBarberId(barberId);

    const slot = slots.find((item) => item.id === bookingSlotId);

    expect(slot).toBeDefined();
  });

  it("should update booking slot", async () => {
    const updated = await BookingSlotRepository.update(bookingSlotId, {
      slot_time: new Date("2026-08-01T11:00:00"),
    });

    expect(updated).toBeDefined();
    expect(updated?.id).toBe(bookingSlotId);
  });

  it("should delete booking slot", async () => {
    const deleted = await BookingSlotRepository.deleteById(bookingSlotId);

    expect(deleted).toBeDefined();
    expect(deleted?.id).toBe(bookingSlotId);
  });

  it("should return undefined after delete", async () => {
    const slot = await BookingSlotRepository.getById(bookingSlotId);

    expect(slot).toBeUndefined();
  });
});
