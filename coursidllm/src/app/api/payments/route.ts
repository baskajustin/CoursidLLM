import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { courseIds, userId } = await req.json();

    if (!courseIds?.length || !userId) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds }, published: true },
      select: { id: true, title: true, price: true, isFree: true },
    });

    if (!courses.length) {
      return NextResponse.json({ error: "No valid courses found" }, { status: 404 });
    }

    const totalAmount = courses.reduce((sum, c) => sum + Number(c.price), 0);

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "usd",
      metadata: {
        userId,
        courseIds: courseIds.join(","),
      },
    });

    const order = await prisma.order.create({
      data: {
        userId,
        stripePaymentIntentId: paymentIntent.id,
        amount: totalAmount,
        currency: "usd",
        status: "PENDING",
        orderItems: {
          create: courses.map((c) => ({
            courseId: c.id,
            price: c.price,
          })),
        },
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    console.error("[API /payments POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
