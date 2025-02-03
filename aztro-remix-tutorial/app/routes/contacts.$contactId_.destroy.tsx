import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteContact } from "../data";


export const action = async ({ params}: ActionFunctionArgs) => {
    // invariant(request.method === "post", "Method not allowed");
    invariant(params.contactId, "No contactId provided");

    await deleteContact(params.contactId);

    return redirect("/", { status: 301})
}

