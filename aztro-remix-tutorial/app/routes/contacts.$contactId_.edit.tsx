import { json,  LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getContact, updateContact } from "../data";
import { Form, useLoaderData,  } from "@remix-run/react";


// esta funcion se encarga de cargar los datos del contacto que se va a editar
export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.contactId, "No contactId provided");
    const contact  = await getContact(params.contactId);

    if(!contact){
        throw new Response("Not Found", {status: 404});
    }

    return json({contact});

}

// Esta funcion de acción se encarga de traer los datos del formulario y actualiza el contacto
// consigue la informacion renderizada en el formulario y la actualiza en la base de datos

export const action = async ({ params, request}: LoaderFunctionArgs) => {
    // invariant(request.method === "post", "Method not allowed");
    invariant(params.contactId, "No contactId provided");

    const formData = await request.formData();
    const update = Object.fromEntries(formData);

    await updateContact(params.contactId, update);

    return redirect(`/contacts/${params.contactId}`, { status: 301})
}


// esta funcion se encarga de mostrar el formulario de edición de un contacto
export default function EditContact(){
    const { contact } = useLoaderData<typeof loader>();
    // const navigate = useNavigate();

    return(
        <Form key={contact.id} method="post" id="contact-form">
            <p>
                <span>Name</span>
                    <input type="text"
                        name="first"
                        defaultValue={contact.first}
                        placeholder="First"
                        aria-label="First Name"
                    />
                    <span>Autor</span>
                    <input type="text"
                        name="autor"
                        defaultValue={contact.autor}
                        placeholder="autor"
                        aria-label="autor"
                    />
                    <span>Avatar</span>
                    <input type="text"
                        name="avatar"
                        defaultValue={contact.avatar}
                        placeholder="avatar"
                        aria-label="avatar"
                    />
            </p>
            <p>
                {/* <span>Avatar</span>
                <img src={contact.avatar} alt={`${contact.first} ${contact.autor}`} /> */}
            </p>
            <p>
                <button type="submit">Save</button>
                <button type="submit">cancel</button>
            </p>
        </Form>
    )
}