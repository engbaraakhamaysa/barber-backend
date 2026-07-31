import { BarberRepository } from "../../src/modules/barbers/barber.repository";
import { ShopRepository } from "../../src/modules/shop/shop.repository";
import { createTestEnvironment } from "./helpers/test-data";

describe("BarberRepository Integration Tests", () => {
  let shopId: number;
  let barberId: number;

  beforeAll(async () => {
    const env = await createTestEnvironment();

    shopId = env.shopId;
    barberId = env.barberId;
  });

  afterAll(async () => {
    await BarberRepository.deleteById(barberId);

    await ShopRepository.deleteById(shopId);
  });

  it("should get barber by id", async () => {
    const barber = await BarberRepository.getById(barberId);

    expect(barber).toBeDefined();

    expect(barber?.id).toBe(barberId);

    expect(barber?.shop_id).toBe(shopId);
  });

  it("should get barbers by shop id", async () => {
    const barbers = await BarberRepository.getByShopId(shopId);

    expect(Array.isArray(barbers)).toBeTrue();

    const barber = barbers.find((item) => item.id === barberId);

    expect(barber).toBeDefined();
  });

  it("should update barber", async () => {
    const updatedBarber = await BarberRepository.update(barberId, {
      name: "Updated Barber",
      email: "updated.barber@test.com",
      password: "newpassword",
      is_active: false,
    });

    expect(updatedBarber).toBeDefined();

    expect(updatedBarber?.id).toBe(barberId);

    expect(updatedBarber?.name).toBe("Updated Barber");

    expect(updatedBarber?.email).toBe("updated.barber@test.com");

    expect(updatedBarber?.is_active).toBeFalse();
  });

  it("should delete barber and linked user", async () => {
    const deletedBarber = await BarberRepository.deleteById(barberId);

    expect(deletedBarber).toBeDefined();

    expect(deletedBarber?.id).toBe(barberId);
  });

  it("should return undefined after delete", async () => {
    const barber = await BarberRepository.getById(barberId);

    expect(barber).toBeUndefined();
  });
});
