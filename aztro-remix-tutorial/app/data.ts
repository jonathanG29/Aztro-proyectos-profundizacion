////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://proassetspdlcom.cdnstatics2.com/usuaris/libros/thumbs/71b825a3-36b0-442b-8327-22f5a47a3d66/d_360_620/portada_habitos-atomicos_james-clear_202002111200.webp",
    first: "habitos atomicos",
    last: "",
  
  },
  {
    avatar:
      "https://imagenes.leadersummaries.com/lsm/Entity/884338C8D3549F65ABF0302612AFF74E/1F39421B868938717A54AA3F5358F938/105f6f37-8725-4176-8925-bf9ca36a1b5e.jpg@300@490@75",
    first: "Comase ese sapo",
    last: "",
    
  },
  {
    avatar:
      "https://acdn.mitiendanube.com/stores/003/646/219/products/img_3269-efcf2e166aea03640b17235111832599-1024-1024.webp",
    first: "si lo crees lo creas",
    last: "",
  },
  {
    avatar:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/cd/46/cd46e9a081c0db1b3a472e3f8392fe49.jpg",
    first: "la biblia de los caidos tomo 1 testamento del gris", 
    last: "",
    
  },
  {
    avatar:
      "https://m.media-amazon.com/images/I/71Y1X15vApL._SL1430_.jpg",
    first: "la bilia de los caidos tomo 1",
    last: "",
  },
  {
    avatar:
      "https://m.media-amazon.com/images/I/91X9JvoDZuL._UF1000,1000_QL80_.jpg",
    first: "la biblia de los caidos tomo 1 testament de MAD",
    last: "",
    
  },
  {
    avatar:
      "https://image.cdn0.buscalibre.com/5b5783d2f4df733a238b4569.__RS360x360__.jpg",
    first: "La biblia de los caidos tomo 1 testamento de nila",
    last: "",
    
  },
  {
    avatar:
      "https://static.wixstatic.com/media/ad1118_8881024d65dd492b93d65ce13718f798~mv2.png/v1/fill/w_458,h_694,al_c,lg_1,q_85,enc_auto/ad1118_8881024d65dd492b93d65ce13718f798~mv2.png",
    first: "La biblia de los caidos tomo 1 testamento de roja",
    last: "",
    
  },
  {
    avatar:
      "https://http2.mlstatic.com/D_NQ_NP_786554-MLU74238692083_012024-O.webp",
    first: "la biblia de los caidos tomo 2 testamento de sombra",
    last: "",
    
  },
  {
    avatar:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/31/56/3156ae43531756e8dea126a64a3f4b5d.jpg",
    first: "la biblia de los caidos tomo 1 testament de sombra",
    last: "Dodds",
    
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
