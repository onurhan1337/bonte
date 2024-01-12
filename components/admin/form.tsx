import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoadingDots } from "../shared/icons";

// Import Quill dynamically because it requires the window object which is not present during SSR
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formSchema = z.object({
  name: z.string({}).min(3).max(255, {
    message: "Kurum adı en az 3, en fazla 255 karakter olmalıdır",
  }),
  excerpt: z.string({}).min(3).max(500, {
    message: "Kurum açıklaması en az 3, en fazla 500 karakter olmalıdır",
  }),
  description: z.string({}).min(3, {
    message: "Kurum bilgi yazısı en az 3 karakter olmalıdır",
  }),
  image: z.string({}),
});

export default function FoundationCreateForm() {
  const selectedImage = useRef<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      excerpt: "",
      description: "",
      image: "",
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (
      !inputFileRef.current?.files ||
      inputFileRef.current?.files.length === 0
    ) {
      toast({
        title: "No file selected",
        description: "Please select a file before submitting the form",
      });
      return;
    }

    const file = inputFileRef.current.files[0];

    const uploadResponse = await fetch(
      `/api/image/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );

    const newBlob = (await uploadResponse.json()) as PutBlobResult;
    setBlob(newBlob);

    const response = await fetch("/api/foundation", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        excerpt: data.excerpt,
        description: data.description,
        image: newBlob.url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      toast({
        title: "Kurum başarıyla oluşturuldu",
        description: "Kurumunuz onaylandıktan sonra yayınlanacaktır",
      });
    } else {
      toast({
        title: "Kurum oluşturulurken bir hata oluştu",
        description: "Lütfen tekrar deneyiniz",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Kurum Adı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.name?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>
                  Kurum Kısa Açıklaması
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.name?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={field.name}>Kurum Açıklaması</FormLabel>
                  <FormControl>
                    <QuillNoSSRWrapper
                      modules={modules}
                      theme="snow"
                      onChange={(content, delta, source, editor) => {
                        form.setValue("description", content);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.name?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="file"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Kurum Fotoğrafı
            </label>
            <div className="mt-2 flex justify-center text-center rounded-lg border border-dashed border-gray-900/25 px-6 py-24 relative">
              <div className="text-center">
                <input
                  id="file"
                  name="file"
                  ref={inputFileRef}
                  type="file"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting ? <LoadingDots /> : "Gönder"}
        </Button>
      </form>
    </Form>
  );
}
