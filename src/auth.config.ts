import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPartnerPage = nextUrl.pathname.startsWith('/partner')
      const isLoginPage = nextUrl.pathname.startsWith('/login')
      const isRegisterPage = nextUrl.pathname.startsWith('/register')
      const isProfilePage = nextUrl.pathname.startsWith('/profile')
      const isAuthPage = isLoginPage || isRegisterPage
      const isMainPage = nextUrl.pathname.startsWith('/')

      if (isPartnerPage || isProfilePage) {
        return isLoggedIn
      } else if (isAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL('/partner', nextUrl))
        else if (isRegisterPage) return true
        return false
      } else if (isMainPage) {
        return Response.redirect(new URL('/partner', nextUrl))
      }
      
      return true
    },
    async jwt({token}) {
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
