export type Account = {
  id: string
  username: string
  firstName: string
  lastName: string
  phone: string
  email: string
  role: Role
}

export type ApiLoginResponse = {
  token: string
  refreshToken: string
  expiresAt: Date
  account: Account
}

export enum Role {
  admin,
  customer
}

// Customer
export interface CreateCustomer {
  name: string
  phone: string
  totalSpent: number
  discountRate: number
}

export interface UpdateCustomer {
  id: string
  name: string
  phone: string
  totalSpent: number
  discountRate: number
}

// Order
export interface CreateOrder {
  userId: string
  date: Date
  totalAmount: number
  sizes: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
}

export interface UpdateOrder {
  id: string
  customerId: string
  date: Date
  totalAmount: number
  status: 'Pending' | 'Completed'
}

// Order Detail
export interface CreateOrderDetail {
  // orderId: string
  waiterId: string
  productId: string
  quantity: number
  price: number
  status?: 'Cooking' | 'Served' | 'Check' | 'Finish'
}

export interface UpdateOrderDetail {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  orderTime: Date
}

export type Pagination = {
  pageSize: number
  totalItem: number
  currentPage: number
  maxPageSize: number
  totalPage: number
}

export type PaymentMethod = 'Card' | 'Cash'

export interface CreatePaymentData {
  orderId: string
  cashierId: string
  amount: number
  paymentMethod: 'Card' | 'Cast'
  paymentStatus: 'Pending' | 'Completed' | 'Cancelled'
  paymentTime: Date
  deleted: boolean
}
