
import React from 'react';

const sampleContacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export default function ContactList() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {sampleContacts.map((contact) => (
            <tr key={contact.id}>
              <td className="py-2 px-4 border">{contact.name}</td>
              <td className="py-2 px-4 border">{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

