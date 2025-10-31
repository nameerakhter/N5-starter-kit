import { z } from 'zod'

import { AGE_REGEX, MOBILE_NUMBER_REGEX, PASSWORD_REGEX } from '@/lib/utils'
import { objectId } from '@/lib/validation'

export const getUserInput = z.object({
  id: objectId,
})

export const profileInput = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' })
    .optional(),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(100, { message: 'Email cannot exceed 100 characters' })
    .optional(),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, { message: 'Invalid mobile number' })
    .optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(100, { message: 'Password cannot exceed 100 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password must include uppercase, lowercase, number, and special character',
      },
    )
    .optional(),
  userId: z
    .string()
    .min(2, { message: 'User ID must be at least 2 characters long' })
    .max(50, { message: 'User ID cannot exceed 50 characters' })
    .optional(),
  districtId: z.string().optional(),
  blockId: z.string().optional(),
  profileImage: z.string().optional(),
})

export type ProfileInputType = z.infer<typeof profileInput>

export const initiatePasswordResetInput = z.object({
  userId: z.string(),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
})

export const verifyOTPInput = z.object({
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const resetPasswordInput = z.object({
  userId: z.string(),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    ),
})

export const updateProfileImageInput = z.object({
  profileImage: z.string().optional(),
})

export const getUserProfileImage = z.object({
  id: objectId,
})

export const addNewUserInput = z.object({
  name: z.string().min(3, 'name must be atleast 3 characters long'),
  age: z.string().regex(AGE_REGEX, 'age must be provided'),
  mobileNumber: z
    .string()
    .regex(MOBILE_NUMBER_REGEX, 'mobile number must be atleast 10 digits'),
  email: z.string().email('please provide a valid email'),
  userId: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      PASSWORD_REGEX,
      'Password must include uppercase, lowercase, number, and special character',
    ),
  type: z.enum(['ADMIN', 'USER']),
})
