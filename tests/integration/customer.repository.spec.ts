import { ShopRepository } from "../../src/modules/shop/shop.repository";

describe("ShopRepository Integration Tests", () => {
  let shopId: number;

  beforeAll(async () => {
    const shop = await ShopRepository.create({
      name: "Test Shop",
      location: "Jenin",
    });

    shopId = shop.id;
  });

  afterAll(async () => {
    await ShopRepository.deleteById(shopId);
  });

  it("should create a shop", async () => {
    const shop = await ShopRepository.getById(shopId);

    expect(shop).toBeDefined();
    expect(shop?.name).toBe("Test Shop");
    expect(shop?.location).toBe("Jenin");
  });

  it("should get shop by id", async () => {
    const shop = await ShopRepository.getById(shopId);

    expect(shop).toBeDefined();
    expect(shop?.id).toBe(shopId);
  });

  it("should get all shops", async () => {
    const shops = await ShopRepository.getAll();

    expect(Array.isArray(shops)).toBeTrue();

    const shop = shops.find((item) => item.id === shopId);

    expect(shop).toBeDefined();
  });

  it("should update shop", async () => {
    const updatedShop = await ShopRepository.update(shopId, {
      name: "Updated Shop",
      location: "Nablus",
      is_active: false,
    });

    expect(updatedShop).toBeDefined();
    expect(updatedShop?.name).toBe("Updated Shop");
    expect(updatedShop?.location).toBe("Nablus");
    expect(updatedShop?.is_active).toBeFalse();
  });

  it("should delete shop", async () => {
    const deletedShop = await ShopRepository.deleteById(shopId);

    expect(deletedShop).toBeDefined();
    expect(deletedShop?.id).toBe(shopId);
  });

  it("should return undefined after delete", async () => {
    const shop = await ShopRepository.getById(shopId);

    expect(shop).toBeUndefined();
  });
});
