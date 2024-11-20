import { toast } from "react-toastify";

jest.mock("react-toastify");

test("should show a success toast", () => {
  toast.success("Success!");
  expect(toast.success).toHaveBeenCalledWith("Success!");
});

test("should show an error toast", () => {
  toast.error("Error!");
  expect(toast.error).toHaveBeenCalledWith("Error!");
});
