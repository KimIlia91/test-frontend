import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { authConfig } from './auth.config'
import { LoginFormSchema } from './lib/auth/auth-validator'
import { getUserByEmail } from './data/repository'

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const { email, password } = LoginFormSchema.parse(credentials)
          const user = await getUserByEmail(email)

          if (!user) return null
          
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            const { id, email, name, image } = user
            return { id, name, email, image }
          }

          return null
        },
      }),
    ],
  }
)