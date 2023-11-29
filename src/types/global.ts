import { IData } from '../modules/Shared/Account/Entity/account.entity'

declare global {
  namespace Express {
    interface Request {
      user: IData
    }
  }
}
