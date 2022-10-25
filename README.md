# Event Transfer Test

This app will display in a list the `Transfer` events from the `ERC20` token contract showing the "from", "to" and the "amount" of the transfer.

## Approach/logic

- Using the `ethers.js` library, I connected to the `Arbitrum One` network
- Attached a listerner using a `useEffect` to the `Transfer` events emitted from the provided `ERC20` token contract.
- Saved the events in a `useState` variable.
- Displayed the events in a list using conditional rendering.

### How to use it

- Add the arbitraty address on the first field of the form.
- Add the contract address on the second field of the form.

### Run Locally

- Clone the repo
- Run `npm install` or `yarn install`
- Run `npm run dev` or `yarn dev`
- Open `http://localhost:3000` on your browser
