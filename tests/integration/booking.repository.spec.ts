import pool from "../../src/config/db";
import { BookingRepository } from "../../src/modules/bookings/booking.repository";

describe("BookingRepository Integration Tests", () => {
  let shopId: number;
  let userId: number;
  let barberId: number;
  let customerId: number;
  let bookingSlotId: number;
  let bookingId: number;

  beforeAll(async () => {
    // Create shop
    const shopResult = await pool.query(
      `
      INSERT INTO shops (
        name,
        location
      )
      VALUES ($1,$2)
      RETURNING id
      `,
      ["Test Shop", "Jenin"],
    );

    shopId = shopResult.rows[0].id;

    // Create barber user
    const userResult = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES ($1,$2,$3,'barber')
      RETURNING id
      `,
      ["Test Barber", `barber_${Date.now()}@test.com`, "password"],
    );

    userId = userResult.rows[0].id;

    // Create barber
    const barberResult = await pool.query(
      `
      INSERT INTO barbers (
        user_id,
        shop_id,
        is_active
      )
      VALUES ($1,$2,true)
      RETURNING id
      `,
      [userId, shopId],
    );

    barberId = barberResult.rows[0].id;

    // Create customer
    const customerResult = await pool.query(
      `
      INSERT INTO customers (
        name,
        phone
      )
      VALUES ($1,$2)
      RETURNING id
      `,
      ["Test Customer", `059${Date.now()}`],
    );

    customerId = customerResult.rows[0].id;

    // Create booking slot
    const slotResult = await pool.query(
      `
      INSERT INTO booking_slots (
        barber_id,
        slot_time
      )
      VALUES ($1,$2)
      RETURNING id
      `,
      [barberId, new Date("2026-08-01T10:00:00")],
    );

    bookingSlotId = slotResult.rows[0].id;
  });

  afterAll(async () => {
    if (bookingId) {
      await pool.query(
        `
        DELETE FROM bookings
        WHERE id=$1
        `,
        [bookingId],
      );
    }

    await pool.query(
      `
      DELETE FROM booking_slots
      WHERE id=$1
      `,
      [bookingSlotId],
    );

    await pool.query(
      `
      DELETE FROM customers
      WHERE id=$1
      `,
      [customerId],
    );

    await pool.query(
      `
      DELETE FROM barbers
      WHERE id=$1
      `,
      [barberId],
    );

    await pool.query(
      `
      DELETE FROM users
      WHERE id=$1
      `,
      [userId],
    );

    await pool.query(
      `
      DELETE FROM shops
      WHERE id=$1
      `,
      [shopId],
    );
  });

  it("should create booking", async () => {
    const booking = await BookingRepository.create({
      customer_id: customerId,
      slot_id: bookingSlotId,
    });

    expect(booking).toBeDefined();

    expect(booking.id).toBeDefined();

    expect(booking.customer_id).toBe(customerId);

    expect(booking.slot_id).toBe(bookingSlotId);

    expect(booking.status).toBe("confirmed");

    bookingId = booking.id;
  });

  it("should get booking by id", async () => {
    const booking = await BookingRepository.getById(bookingId);

    expect(booking).toBeDefined();

    expect(booking?.id).toBe(bookingId);
  });

  it("should get all bookings", async () => {
    const bookings = await BookingRepository.getAll();

    expect(Array.isArray(bookings)).toBeTrue();

    const booking = bookings.find((item) => item.id === bookingId);

    expect(booking).toBeDefined();
  });

  it("should get bookings by customer", async () => {
    const bookings = await BookingRepository.getByCustomerId(customerId);

    expect(Array.isArray(bookings)).toBeTrue();

    const booking = bookings.find((item) => item.id === bookingId);

    expect(booking).toBeDefined();
  });

  it("should get bookings by barber", async () => {
    const bookings = await BookingRepository.getByBarberId(barberId);

    expect(Array.isArray(bookings)).toBeTrue();

    const booking = bookings.find((item) => item.id === bookingId);

    expect(booking).toBeDefined();
  });

  it("should update booking status", async () => {
    const updated = await BookingRepository.update(bookingId, {
      status: "cancelled",
    });

    expect(updated).toBeDefined();

    expect(updated?.status).toBe("cancelled");
  });

  it("should delete booking", async () => {
    const deleted = await BookingRepository.deleteById(bookingId);

    expect(deleted).toBeDefined();

    expect(deleted?.id).toBe(bookingId);
  });

  it("should return undefined after delete", async () => {
    const booking = await BookingRepository.getById(bookingId);

    expect(booking).toBeUndefined();
  });
});
