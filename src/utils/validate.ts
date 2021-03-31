const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 至少包含一位数字 一位字母 长度至少为8位密码
const passwordRegexp = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/

function isValidEmail(email: string): boolean {
  return emailRegexp.test(email)
}

function isValidPassword(password: string): boolean {
  return passwordRegexp.test(password)
}

type Rules = 'required' | 'email' | 'password'

interface RuleProp {
  type: Rules
  message: string
}

export type RuleProps = Array<RuleProp>

type ValidationType = Record<Rules, (...args: any[]) => boolean>

export const Validation: ValidationType = {
  email(str: string) {
    return isValidEmail(str)
  },
  required(str: string) {
    return !!str.trim()
  },
  password(str: string) {
    return isValidPassword(str)
  }
}
