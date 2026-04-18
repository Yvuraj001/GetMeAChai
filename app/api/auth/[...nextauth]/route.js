import NextAuth from 'next-auth'

import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import connectDB from '@/app/db/connectdb'
 
import Users from '@/app/models/Users'


export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers ...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // // Passwordless / email sign in
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth. js <no-reply@example.com>'

        // })
    ],
    // callbacks... 
        // This is custom code to operate singin , save info to database and stuff like that.
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == 'github' || account.provider == 'google') {

                await connectDB()

                let currentuser = await Users.findOne({ email: user.email })
                if (!currentuser) {
                    const newUser = new Users({
                        email: user.email,
                        username:  user.email.split("@")[0]

                    })
                    await newUser.save()

                }


            }
            return true
        },
        async session({ session, user, token }) {
            const dbUser = await Users.findOne({ email: session.user.email })
            session.user.name = dbUser.username
            return session

        },
    }
})
export { authoptions as GET, authoptions as POST }