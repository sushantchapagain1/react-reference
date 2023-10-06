import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // instead of returing a object and doing it withour mutating now in reduxtool kit we mutate the object directly but
    // behind the scenes redux toolkit is using a package called immer.js
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // this reducer function donot have two arguments so when we want to accept two arguments then we can use prepare method.
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingAmount(state) {
      state.isLoading = true;
    },
  },
});

// Not doing it the createAsync Thunk way
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // if we return a function in action controller then redux will know its a async call however middlware should be passed in store to make it work.
  return async function (dispatch, state) {
    dispatch({ type: "account/convertingAmount" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export const { withdraw, payLoan, requestLoan } = accountSlice.actions;

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "deposit/loading":
      return { ...state, isLoading: true };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.message,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "deposit/loading", payload: amount };

  // if we return a function in action controller then redux will know its a async call however middlware should be passed in store to make it work.
  return async function (dispatch, state) {
    dispatch({ type: "deposit/loading" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, message) {
  return { type: "account/requestLoan", payload: { amount, message } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
