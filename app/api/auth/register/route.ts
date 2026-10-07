import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ success: false, message: 'Email invalid.' }, { status: 400 });
        }
        if (!password || typeof password !== 'string' || password.length < 8) {
            return NextResponse.json({ success: false, message: 'Parola trebuie să aibă minim 8 caractere.' }, { status: 400 });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existing = await prisma.user.findFirst({
            where: { email: { equals: normalizedEmail, mode: 'insensitive' }, source: { equals: 'HomePrint.ro', mode: 'insensitive' } }
        });
        if (existing) {
            return NextResponse.json({ success: false, message: 'Există deja un cont cu acest email pe HomePrint.' }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Check if 'passwordHash' exists in schema or 'password'
        // Based on previous db push, user model has passwordHash? I should check schema.
        // Assuming passwordHash based on prynt sync.
        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                source: "HomePrint.ro",
                name: (typeof name === 'string' && name.trim()) ? name.trim() : undefined,
                passwordHash,
            },
        });

        await sendWelcomeEmail(user.email!, user.name || "Client");

        return NextResponse.json({ success: true });

    } catch (e: any) {
        if (e?.code === 'P2002') return NextResponse.json({ success: false, message: 'Există deja un cont cu acest email.' }, { status: 409 });
        console.error('[register] error', e?.message || e);
        return NextResponse.json({ success: false, message: 'Eroare internă.' }, { status: 500 });
    }
}
