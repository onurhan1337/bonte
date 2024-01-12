import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Foundation } from "interfaces/index";
import { FormEvent, useRef, useState } from "react";
import fetcher from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { PutBlobResult } from "@vercel/blob";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoadingDots } from "@/components/shared/icons";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Container from "@/components/shared/container";

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

export default function EditFoundation() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const router = useRouter();
  const { id } = router.query;
  const { data: foundation, error } = useSWR<Foundation>(
    id ? `/api/foundation/${id}` : null,
    fetcher
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: foundation?.name || "",
      excerpt: foundation?.excerpt || "",
      description: foundation?.description || "",
      image: foundation?.image || "",
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  if (error) return <div>Failed to load</div>;
  if (!foundation) return <div>Loading...</div>;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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

    const updatedFoundation = {
      ...foundation,
      name: data.name,
      excerpt: data.excerpt,
      description: data.description,
      image: newBlob.url,
    };

    // Optimistically update the local data
    mutate(`/api/foundation/${id}`, updatedFoundation, false);

    // Send the update request and revalidate the data
    const res = await fetch(`/api/foundation/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFoundation),
    });
    mutate(`/api/foundation/${id}`);

    if (res.ok) {
      toast({
        title: "Kurum güncellendi",
        description: "Kurum bilgileri başarıyla güncellendi",
      });
      router.push("/admin");
    } else {
      toast({
        title: "Kurum güncellenemedi",
        description: "Kurum bilgileri güncellenirken bir hata oluştu",
      });
    }
  };

  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={field.name}>Kurum Adı</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={foundation.name}
                      {...form.register("name", { required: true })}
                    />
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
                    <Input
                      defaultValue={foundation.excerpt}
                      {...form.register("excerpt", { required: true })}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.excerpt?.message}
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
                        {...form.register("description", { required: true })}
                        {...field}
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
              <img
                src={foundation.image}
                alt={foundation.name}
                className="object-contain py-2 w-full max-h-24"
              />
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
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? <LoadingDots /> : "Gönder"}
          </Button>
        </form>
      </Form>
    </Container>
  );
}
