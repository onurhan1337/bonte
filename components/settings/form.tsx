import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "../shared/icons/loading-spinner";
import { LoadingDots } from "../shared/icons";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "İsim en az 3 karakter olmalıdır.",
  }),
});

const SettingsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve(null);
      }, 3000);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">İsim</FormLabel>
              <FormControl>
                <Input {...field} type="text" className="mt-1 block w-full" />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 rounded-full inline-flex items-center justify-center space-x-4 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
          h-10 w-40
          "
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <LoadingDots color="#FFFFFF" />
          ) : (
            "Kaydet"
          )}
        </button>
      </form>
    </Form>
  );
};

export default SettingsForm;
