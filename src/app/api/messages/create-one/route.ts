import { NextRequest, NextResponse } from "next/server";

export const POST = (req: NextRequest) => {
    

    return NextResponse.json({
        success: false,
        message: "failed to create the message",
        createdMessageId: 34,
        createdMessageContent: "asdlfkj"
    })
}