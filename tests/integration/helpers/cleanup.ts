import pool from "../../../src/config/db";

export async function cleanupTestEnvironment(data: {
  shopId: number;
  barberId: number;
  customerId: number;
  bookingSlotId: number;
}) {
  await pool.query(
    `
    DELETE FROM bookings
    WHERE booking_slot_id = $1
    `,
    [data.bookingSlotId],
  );

  await pool.query(
    `
    DELETE FROM booking_slots
    WHERE id = $1
    `,
    [data.bookingSlotId],
  );

  await pool.query(
    `
    DELETE FROM customers
    WHERE id = $1
    `,
    [data.customerId],
  );

  await pool.query(
    `
    DELETE FROM barbers
    WHERE id = $1
    `,
    [data.barberId],
  );

  await pool.query(
    `
    DELETE FROM shops
    WHERE id = $1
    `,
    [data.shopId],
  );
}
