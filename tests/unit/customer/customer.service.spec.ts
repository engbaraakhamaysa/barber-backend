import { CustomerService } from "../../../src/modules/customers/customer.service";
import { CustomerRepository } from "../../../src/modules/customers/customer.repository";

describe("CustomerService", () => {
  const mockCustomer = {
    id: 1,
    user_id: null,
    name: "Ahmad",
    phone: "0599999999",
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe("create", () => {
    it("should create customer", async () => {
      spyOn(CustomerRepository, "create").and.resolveTo(mockCustomer);

      const result = await CustomerService.create({
        name: "Ahmad",
        phone: "0599999999",
      });

      expect(CustomerRepository.create).toHaveBeenCalledWith({
        name: "Ahmad",
        phone: "0599999999",
      });

      expect(result.id).toBe(1);

      expect(result.name).toBe("Ahmad");
    });
  });

  describe("getAll", () => {
    it("should return all customers", async () => {
      spyOn(CustomerRepository, "getAll").and.resolveTo([mockCustomer]);

      const result = await CustomerService.getAll();

      expect(CustomerRepository.getAll).toHaveBeenCalled();

      expect(result.length).toBe(1);

      expect(result[0]?.name).toBe("Ahmad");
    });
  });

  describe("getById", () => {
    it("should return customer by id", async () => {
      spyOn(CustomerRepository, "getById").and.resolveTo(mockCustomer);

      const result = await CustomerService.getById(1);

      expect(CustomerRepository.getById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined when customer not found", async () => {
      spyOn(CustomerRepository, "getById").and.resolveTo(undefined);

      const result = await CustomerService.getById(99);

      expect(result).toBeUndefined();
    });
  });

  describe("update", () => {
    it("should update customer", async () => {
      spyOn(CustomerRepository, "update").and.resolveTo(mockCustomer);

      const result = await CustomerService.update(1, {
        name: "New Name",
      });

      expect(CustomerRepository.update).toHaveBeenCalledWith(1, {
        name: "New Name",
      });

      expect(result?.id).toBe(1);
    });

    it("should return undefined if customer does not exist", async () => {
      spyOn(CustomerRepository, "update").and.resolveTo(undefined);

      const result = await CustomerService.update(99, {
        name: "Test",
      });

      expect(result).toBeUndefined();
    });
  });

  describe("deleteById", () => {
    it("should delete customer", async () => {
      spyOn(CustomerRepository, "deleteById").and.resolveTo(mockCustomer);

      const result = await CustomerService.deleteById(1);

      expect(CustomerRepository.deleteById).toHaveBeenCalledWith(1);

      expect(result?.id).toBe(1);
    });

    it("should return undefined if customer does not exist", async () => {
      spyOn(CustomerRepository, "deleteById").and.resolveTo(undefined);

      const result = await CustomerService.deleteById(99);

      expect(result).toBeUndefined();
    });
  });
});
