```ts
/**
 * Collection `accounts`.
 */
interface accounts {
  /**
   * Account ID.
   */
  id: string

  /**
   * The current balance of the  account.
   */
  balance: number

  /**
   * Full name of the account holder.
   */
  holder: string

  /**
   * Last withdrawal date.
   */
  lastWithdrawalDate: string

  /**
   * Withdrawal amount of the current day.
   */
  currentWithdrawalBalance: number
}
```
