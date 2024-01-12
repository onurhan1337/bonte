import React from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

import fetcher from "@/lib/utils";
import { Foundation } from "interfaces";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const AdminFoundationsList = () => {
  const router = useRouter();
  const { data: foundations, error } = useSWR<Foundation[]>(
    "/api/foundation",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!foundations) return <div>Loading...</div>;

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/foundation/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting foundation");
      }

      // Refresh the data after a successful delete
      mutate("/api/foundation");

      toast({
        title: "Kurum başarıyla silindi",
      });
    } catch (error) {
      console.error("Failed to delete foundation:", error);
    }
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Foundations List</h1>
      {foundations.map((foundation: Foundation) => (
        <div
          key={foundation.id}
          className="flex items-center justify-between mb-6 p-4 border rounded shadow-inner"
        >
          <h2 className="text-2xl font-semibold mb-2">{foundation.name}</h2>
          <p className="text-base mb-4">{foundation.excerpt}</p>
          <div className="space-x-2">
            <Button
              onClick={() =>
                router.push(`/admin/foundation/edit/${foundation.id}`)
              }
              variant={"outline"}
              size={"icon"}
            >
              <EditIcon />
            </Button>
            <Button
              onClick={() => handleDelete(foundation.id.toString())}
              variant={"outline"}
              size={"icon"}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      ))}

      {foundations.length === 0 && (
        <p className="text-xl text-center font-semibold">
          No foundations added yet.
        </p>
      )}
    </div>
  );
};

export default AdminFoundationsList;

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-edit"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
    <path d="M16 5l3 3" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trash"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
);
