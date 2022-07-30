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
    test("Then new bill form should be visible", async() => {
      await setup();
      window.onNavigate(ROUTES_PATH.NewBill);

      const pageTitle = screen.getByText("Envoyer une note de frais");
      expect(pageTitle).toBeTruthy();

      const formEl = screen.getByTestId("form-new-bill");
      expect(formEl).toBeTruthy();

      const elements = {
        type: screen.getByTestId("expense-type"),
        name: screen.getByTestId("expense-name"),
        date: screen.getByTestId("datepicker"),
        amount: screen.getByTestId("amount"),
        vat: screen.getByTestId("vat"),
        pct: screen.getByTestId("pct"),
        commentary: screen.getByTestId("commentary"),
        file: screen.getByTestId("file"),
      };
      Object.keys(elements).forEach((key) =>
        expect(elements[key]).toBeTruthy()
      );
    });
    
    // File upload
    describe("And I choose an image file", () => {
      describe("If image extension is allowed", () => {
        test("Then store.bills().create() should be called", async () => {
          await setup();
          window.onNavigate(ROUTES_PATH.NewBill);

          // Spy
          const bills = mockStore.bills();
          const newBill = jest.spyOn(bills, "create");

           // Elements
           const fileInputEl = screen.getByTestId("file");

           const now = new Date();
           const file = new File([], "test.png", {
             type: "image/png",
             lastModified: now.getTime(),
           });

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
        });
      });
   }); 
   
   
  });
});

// Form validation
describe("And I DON'T fill required form fields", () => {
  test("Then submit will do nothing", async () => {
    await setup();
    window.onNavigate(ROUTES_PATH.NewBill);

    // Submit form
    const formEl = screen.getByTestId("form-new-bill");
    fireEvent["submit"](formEl);
  })
})
    //
      /*const html = NewBillUI()
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
})*/
