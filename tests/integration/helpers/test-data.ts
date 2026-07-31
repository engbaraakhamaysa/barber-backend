import { ShopRepository } from "../../../src/modules/shop/shop.repository";
import { UserRepository } from "../../../src/modules/users/user.repository";
import { BarberRepository } from "../../../src/modules/barbers/barber.repository";
import { CustomerRepository } from "../../../src/modules/customers/customer.repository";
import { BookingSlotRepository } from "../../../src/modules/booking-slots/booking-slot.repository";
import { BookingRepository } from "../../../src/modules/bookings/booking.repository";

export async function createTestEnvironment() {
  // =========================
  // Create Shops
  // =========================

  const shop1 = await ShopRepository.create({
    name: `Barber Shop One ${Date.now()}`,
    location: "Jenin",
  });

  const shop2 = await ShopRepository.create({
    name: `Barber Shop Two ${Date.now()}`,
    location: "Nablus",
  });

  // =========================
  // Create Barber Users
  // =========================

  const barberUser1 = await UserRepository.create({
    name: "Ahmad Barber",
    email: `ahmad_${Date.now()}@test.com`,
    password: "password",
    role: "barber",
  });

  const barberUser2 = await UserRepository.create({
    name: "Omar Barber",
    email: `omar_${Date.now()}@test.com`,
    password: "password",
    role: "barber",
  });

  // =========================
  // Create Barbers
  // =========================

  const barber1 = await BarberRepository.create({
    name: "Ahmad Barber",
    email: barberUser1.email,
    password: "password",
    shop_id: shop1.id,
  });

  const barber2 = await BarberRepository.create({
    name: "Omar Barber",
    email: barberUser2.email,
    password: "password",
    shop_id: shop2.id,
  });

  // =========================
  // Create Customers
  // =========================

  const customer1 = await CustomerRepository.create({
    name: "Customer One",
    phone: `059${Date.now()}1`,
  });

  const customer2 = await CustomerRepository.create({
    name: "Customer Two",
    phone: `059${Date.now()}2`,
  });

  // =========================
  // Create Booking Slots
  // =========================

  const slot1 = await BookingSlotRepository.create({
    barber_id: barber1.id,
    slot_time: new Date("2026-08-01T10:00:00"),
  });

  const slot2 = await BookingSlotRepository.create({
    barber_id: barber1.id,
    slot_time: new Date("2026-08-01T10:20:00"),
  });

  const slot3 = await BookingSlotRepository.create({
    barber_id: barber2.id,
    slot_time: new Date("2026-08-01T11:00:00"),
  });

  const slot4 = await BookingSlotRepository.create({
    barber_id: barber2.id,
    slot_time: new Date("2026-08-01T11:20:00"),
  });

  // =========================
  // Create Bookings
  // =========================

  const booking1 = await BookingRepository.create({
    customer_id: customer1.id,
    slot_id: slot1.id,
  });

  const booking2 = await BookingRepository.create({
    customer_id: customer2.id,
    slot_id: slot3.id,
  });

  return {
    shops: {
      shop1,
      shop2,
    },

    users: {
      barberUser1,
      barberUser2,
    },

    barbers: {
      barber1,
      barber2,
    },

    customers: {
      customer1,
      customer2,
    },

    slots: {
      slot1,
      slot2,
      slot3,
      slot4,
    },

    bookings: {
      booking1,
      booking2,
    },
  };
}
