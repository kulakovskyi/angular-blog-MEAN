export interface UserLoginResponseInterface {
  success: boolean
  token: string
  user: UserLocalStorageInterface
}

export interface UserLocalStorageInterface{
  email: string
  id: string
  login: string
  name: string | null
}
