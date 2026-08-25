import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendConfiguratorWelcomeEmail, type NewsletterSubscription } from '@/lib/emailMarketing';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body: NewsletterSubscription = await req.json();
    const { email, name, interests, source, utmParams } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Email invalid.' },
        { status: 400 }
      );
    }

    const sourceVal = source || 'unknown';

    // Check if already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { 
        email_source: {
          email,
          source: sourceVal
        }
      }
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'Acest email este deja abonat la newsletter.' },
        { status: 400 }
      );
    }

    // Save subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        source: sourceVal
      }
    });

    // Send welcome email based on main interest
    if (interests && interests.length > 0) {
      try {
        await sendConfiguratorWelcomeEmail(body);
      } catch (emailError) {
        console.warn('[Newsletter] Welcome email failed:', emailError);
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Abonare reușită! Verifică email-ul pentru confirmare.',
      subscriber: {
        email: subscriber.email,
        source: subscriber.source
      }
    });

  } catch (error) {
    console.error('[Newsletter Subscribe]', error);
    return NextResponse.json(
      { message: 'Eroare internă. Încearcă din nou.' },
      { status: 500 }
    );
  }
}