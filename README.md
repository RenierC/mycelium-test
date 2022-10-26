# Event Transfer Test

This app will display in a list the `Transfer` events from the `ERC20` token contract showing the "from", "to" and the "amount" of the transfer.

## Approach/logic

- Using the `ethers.js` library, I connected to the `Arbitrum One` network
- Attached 2 `ERC20.on` listerners using the filters that goes `to the user` and `from the user`
- Added the the `Transfer` events to a `useEffect` to capture in real time the events emitted from the provided `ERC20` token contract.
- Saved the events in a `useState` variable.
- Displayed the events in said varaible a list using conditional rendering.

### How to use it
- Visit [https://mycelium-test.vercel.app/](https://mycelium-test.vercel.app/)
- Add the arbitraty address on the first field of the form.
- Add the ERC20 compliant contract address on the second field of the form.
- In your wallet transfer the ERC20 to an address back and forth and the list will populate

### Run Locally

- Clone the repo
- Run `npm install` or `yarn install`
- Run `npm run dev` or `yarn dev`
- Open [http://localhost:3000](http://localhost:3000) on your browser
