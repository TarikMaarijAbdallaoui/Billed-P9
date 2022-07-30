/**
 * @jest-environment jsdom
 */

 import "@testing-library/jest-dom";
 import { fireEvent, screen, waitFor } from "@testing-library/dom";
 import { ROUTES_PATH } from "../constants/routes.js";
 import { localStorageMock } from "../__mocks__/localStorage.js";
 import mockStore from "../__mocks__/store.js";
 import router from "../app/Router.js";

 jest.mock("../app/Store", () => mockStore);

 const setup = async () => {
   Object.defineProperty(window, "localStorage", { value: localStorageMock });
   localStorage.setItem(
     "user",
     JSON.stringify({ type: "Employee", email: "a@a" })
   );
   const root = document.createElement("div");
   root.setAttribute("id", "root");
   document.body.append(root);
   router();
   return root;
 };



describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      
      // Choose a file
      fireEvent["change"](fileInputEl, {
        target: {
          ...fileInputEl,
          files: [file],
        },
      });
      await waitFor(() => process.nextTick);

      // Assertions
      expect(bills.create).not.toBeCalled();
      expect(window.location.hash).toBe(ROUTES_PATH.NewBill);

      jest.restoreAllMocks();
    })
  })
})
