import { prismaClient } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const resources = await req.json();
    if (!resources) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const {
      id,
      name,
      type,
      description,
      website,
      isActive,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      phone,
      email,
      contactName,
      createdAt,
      updatedAt,
      manager,
      category,
    } = resources;

    const newresource = await prismaClient.resource.create({
      data: {
        id,
        name,
        type,
        description,
        website,
        isActive,

        // Location
        address,
        city,
        state,
        zipCode,
        latitude,
        longitude,

        // Contact
        phone,
        email,
        contactName,

        // Relations

        createdAt,
        updatedAt,
        manager,
        category,
      },
    });

    return NextResponse.json(newresource, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
